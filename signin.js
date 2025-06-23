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
const signinForm = document.getElementById("signin-form");
const signinErrorsDiv = document.getElementById("signin-errors");
const emailInput = signinForm.querySelector("[name='email']");
const passwordInput = signinForm.querySelector("[name='password']");
emailInput.addEventListener("blur", () => {
    if (!emailInput.value.trim()) {
        signinErrorsDiv.innerHTML = "البريد الإلكتروني مطلوب";
    }
    else if (!(0, validators_1.isEmailValid)(emailInput.value)) {
        signinErrorsDiv.innerHTML = "البريد الإلكتروني غير صالح";
    }
    else {
        signinErrorsDiv.innerHTML = "";
    }
});
passwordInput.addEventListener("blur", () => {
    if (!passwordInput.value.trim()) {
        signinErrorsDiv.innerHTML = "كلمة المرور مطلوبة";
    }
    else {
        signinErrorsDiv.innerHTML = "";
    }
});
signinForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const formData = new FormData(signinForm);
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };
    signinErrorsDiv.innerHTML = "";
    const errors = (0, validators_1.validateSignIn)(data);
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
        const response = yield (0, mockBackend_1.mockSignIn)(data);
        signinErrorsDiv.innerHTML = "";
        alert(response);
        console.log("بيانات المستخدم:", data);
        signinForm.reset();
    }
    catch (error) {
        signinErrorsDiv.innerHTML = "";
        const errorP = document.createElement("p");
        errorP.className = "error";
        errorP.innerText = error;
        signinErrorsDiv.appendChild(errorP);
    }
}));
