import { Injectable } from '@angular/core';
import axiosInstance from './axios-instance';
import { Category, CategoryCreateDto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  async getCategories(): Promise<Category[]> {
    const response = await axiosInstance.get<Category[]>('/categories');
    return response.data;
  }

  async getCategory(id: number): Promise<Category> {
    const response = await axiosInstance.get<Category>(`/categories/${id}`);
    return response.data;
  }

  async createCategory(data: CategoryCreateDto): Promise<Category> {
    const response = await axiosInstance.post<Category>('/categories', data);
    return response.data;
  }

  async updateCategory(id: number, data: CategoryCreateDto): Promise<Category> {
    const response = await axiosInstance.put<Category>(`/categories/${id}`, data);
    return response.data;
  }

  async deleteCategory(id: number): Promise<void> {
    await axiosInstance.delete(`/categories/${id}`);
  }
}
