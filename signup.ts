import { SignUpData } from "./types";
import { validateSignUp, isEmailValid } from "./validators";
import { mockSignUp } from "./mockBackend";

const signupForm = document.getElementById("signup-form") as HTMLFormElement;
const signupErrorsDiv = document.getElementById("signup-errors") as HTMLDivElement;
const fullNameInput = signupForm.querySelector("[name='fullName']") as HTMLInputElement;
const emailInput = signupForm.querySelector("[name='email']") as HTMLInputElement;
const passwordInput = signupForm.querySelector("[name='password']") as HTMLInputElement;
const confirmPasswordInput = signupForm.querySelector("[name='confirmPassword']") as HTMLInputElement;

fullNameInput.addEventListener("blur", () => {
  if (!fullNameInput.value.trim()) {
    signupErrorsDiv.innerHTML = "الاسم الكامل مطلوب";
  } else {
    signupErrorsDiv.innerHTML = "";
  }
});

emailInput.addEventListener("blur", () => {
  if (!emailInput.value.trim()) {
    signupErrorsDiv.innerHTML = "البريد الإلكتروني مطلوب";
  } else if (!isEmailValid(emailInput.value)) {
    signupErrorsDiv.innerHTML = "البريد الإلكتروني غير صالح";
  } else {
    signupErrorsDiv.innerHTML = "";
  }
});

passwordInput.addEventListener("blur", () => {
  if (!passwordInput.value) {
    signupErrorsDiv.innerHTML = "كلمة المرور مطلوبة";
  } else if (passwordInput.value.length < 8) {
    signupErrorsDiv.innerHTML = "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل";
  } else {
    signupErrorsDiv.innerHTML = "";
  }
});

confirmPasswordInput.addEventListener("blur", () => {
  if (confirmPasswordInput.value !== passwordInput.value) {
    signupErrorsDiv.innerHTML = "كلمتا المرور غير متطابقتين";
  } else {
    signupErrorsDiv.innerHTML = "";
  }
});

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  const data: SignUpData = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  signupErrorsDiv.innerHTML = "";
  const errors = validateSignUp(data);
  if (Object.keys(errors).length > 0) {
    for (const key in errors) {
      const errorP = document.createElement("p");
      errorP.className = "error";
      errorP.innerText = errors[key];
      signupErrorsDiv.appendChild(errorP);
    }
    return;
  }
  try {
    signupErrorsDiv.textContent = "جارٍ المعالجة...";
    const response = await mockSignUp(data);
    signupErrorsDiv.innerHTML = "";
    alert(response);
    console.log("بيانات المستخدم:", data);
    signupForm.reset();
  } catch (error) {
    signupErrorsDiv.innerHTML = "";
    const errorP = document.createElement("p");
    errorP.className = "error";
    errorP.innerText = error as string;
    signupErrorsDiv.appendChild(errorP);
  }
});
