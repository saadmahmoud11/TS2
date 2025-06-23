import { SignInData } from "./types";
import { validateSignIn, isEmailValid } from "./validators";
import { mockSignIn } from "./mockBackend";

const signinForm = document.getElementById("signin-form") as HTMLFormElement;
const signinErrorsDiv = document.getElementById("signin-errors") as HTMLDivElement;
const emailInput = signinForm.querySelector("[name='email']") as HTMLInputElement;
const passwordInput = signinForm.querySelector("[name='password']") as HTMLInputElement;

emailInput.addEventListener("blur", () => {
  if (!emailInput.value.trim()) {
    signinErrorsDiv.innerHTML = "البريد الإلكتروني مطلوب";
  } else if (!isEmailValid(emailInput.value)) {
    signinErrorsDiv.innerHTML = "البريد الإلكتروني غير صالح";
  } else {
    signinErrorsDiv.innerHTML = "";
  }
});

passwordInput.addEventListener("blur", () => {
  if (!passwordInput.value.trim()) {
    signinErrorsDiv.innerHTML = "كلمة المرور مطلوبة";
  } else {
    signinErrorsDiv.innerHTML = "";
  }
});

signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signinForm);
  const data: SignInData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  signinErrorsDiv.innerHTML = "";
  const errors = validateSignIn(data);
  if (Object.keys(errors).length > 0) {
    for (const key in errors) {
      const errorP = document.createElement("p");
      errorP.className = "error";
      errorP.innerText = errors[key];
      signinErrorsDiv.appendChild(errorP);
    }
    return;
  }
  try {
    signinErrorsDiv.textContent = "جارٍ المعالجة...";
    const response = await mockSignIn(data);
    signinErrorsDiv.innerHTML = "";
    alert(response);
    console.log("بيانات المستخدم:", data);
    signinForm.reset();
  } catch (error) {
    signinErrorsDiv.innerHTML = "";
    const errorP = document.createElement("p");
    errorP.className = "error";
    errorP.innerText = error as string;
    signinErrorsDiv.appendChild(errorP);
  }
});
