export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
