export interface SignInBodyType {
  email?: string;
  username?: string;
  password: string;
}

export interface SignUpBodyType {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
