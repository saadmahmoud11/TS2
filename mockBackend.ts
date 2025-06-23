import { SignUpData, SignInData } from "./types";

export function mockSignUp(data: SignUpData): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "taken@example.com") {
        reject("البريد الإلكتروني موجود بالفعل");
      } else {
        resolve("تم إنشاء الحساب بنجاح");
      }
    }, 1000);
  });
}

export function mockSignIn(data: SignInData): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "user@example.com" && data.password === "password123") {
        resolve("تم تسجيل الدخول بنجاح");
      } else {
        reject("بيانات الدخول غير صحيحة");
      }
    }, 1000);
  });
}
