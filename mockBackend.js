"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockSignUp = mockSignUp;
exports.mockSignIn = mockSignIn;
function mockSignUp(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.email === "taken@example.com") {
                reject("البريد الإلكتروني موجود بالفعل");
            }
            else {
                resolve("تم إنشاء الحساب بنجاح");
            }
        }, 1000);
    });
}
function mockSignIn(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.email === "user@example.com" && data.password === "password123") {
                resolve("تم تسجيل الدخول بنجاح");
            }
            else {
                reject("بيانات الدخول غير صحيحة");
            }
        }, 1000);
    });
}
