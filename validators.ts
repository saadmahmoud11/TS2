import { SignUpData, SignInData, FormErrors } from "./types";

export function isEmailValid(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateSignUp(data: SignUpData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) {
    errors.fullName = "الاسم الكامل مطلوب";
  }
  if (!data.email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب";
  } else if (!isEmailValid(data.email)) {
    errors.email = "البريد الإلكتروني غير صالح";
  }
  if (!data.password) {
    errors.password = "كلمة المرور مطلوبة";
  } else if (data.password.length < 8) {
    errors.password = "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل";
  }
  if (!data.confirmPassword) {
    errors.confirmPassword = "تأكيد كلمة المرور مطلوب";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "كلمة المرور وتأكيدها غير متطابقين";
  }
  return errors;
}

export function validateSignIn(data: SignInData): FormErrors {
  const errors: FormErrors = {};
  if (!data.email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب";
  } else if (!isEmailValid(data.email)) {
    errors.email = "البريد الإلكتروني غير صالح";
  }
  if (!data.password) {
    errors.password = "كلمة المرور مطلوبة";
  }
  return errors;
}
