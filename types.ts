export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SignInData {
  email: string;
  password: string;
}
export interface FormErrors {
  [key: string]: string;
}
