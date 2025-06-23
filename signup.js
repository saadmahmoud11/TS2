"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./validators");
const mockBackend_1 = require("./mockBackend");
const signupForm = document.getElementById("signup-form");
const signupErrorsDiv = document.getElementById("signup-errors");
const fullNameInput = signupForm.querySelector("[name='fullName']");
const emailInput = signupForm.querySelector("[name='email']");
const passwordInput = signupForm.querySelector("[name='password']");
const confirmPasswordInput = signupForm.querySelector("[name='confirmPassword']");
fullNameInput.addEventListener("blur", () => {
    if (!fullNameInput.value.trim()) {
        signupErrorsDiv.innerHTML = "الاسم الكامل مطلوب";
    }
    else {
        signupErrorsDiv.innerHTML = "";
    }
});
emailInput.addEventListener("blur", () => {
    if (!emailInput.value.trim()) {
        signupErrorsDiv.innerHTML = "البريد الإلكتروني مطلوب";
    }
    else if (!(0, validators_1.isEmailValid)(emailInput.value)) {
        signupErrorsDiv.innerHTML = "البريد الإلكتروني غير صالح";
    }
    else {
        signupErrorsDiv.innerHTML = "";
    }
});
passwordInput.addEventListener("blur", () => {
    if (!passwordInput.value) {
        signupErrorsDiv.innerHTML = "كلمة المرور مطلوبة";
    }
    else if (passwordInput.value.length < 8) {
        signupErrorsDiv.innerHTML = "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل";
    }
    else {
        signupErrorsDiv.innerHTML = "";
    }
});
confirmPasswordInput.addEventListener("blur", () => {
    if (confirmPasswordInput.value !== passwordInput.value) {
        signupErrorsDiv.innerHTML = "كلمتا المرور غير متطابقتين";
    }
    else {
        signupErrorsDiv.innerHTML = "";
    }
});
signupForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const data = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };
    signupErrorsDiv.innerHTML = "";
    const errors = (0, validators_1.validateSignUp)(data);
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
        const response = yield (0, mockBackend_1.mockSignUp)(data);
        signupErrorsDiv.innerHTML = "";
        alert(response);
        console.log("بيانات المستخدم:", data);
        signupForm.reset();
    }
    catch (error) {
        signupErrorsDiv.innerHTML = "";
        const errorP = document.createElement("p");
        errorP.className = "error";
        errorP.innerText = error;
        signupErrorsDiv.appendChild(errorP);
    }
}));
