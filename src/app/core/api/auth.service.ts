import { Injectable } from '@angular/core';
import axiosInstance from './axios-instance';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', {
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: 'CUSTOMER'
    });
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await axiosInstance.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      return null;
    }
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): 'ADMIN' | 'CUSTOMER' | null {
    const user = this.getStoredUser();
    return user?.role || null;
  }
}
