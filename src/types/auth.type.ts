export interface SignupCredentials {
  email: string;
  password: string;
}

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
