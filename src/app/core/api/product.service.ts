import { Injectable } from '@angular/core';
import axiosInstance from './axios-instance';
import { Product, ProductCreateDto, ProductUpdateDto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  async getProducts(params?: { search?: string; category_id?: number }): Promise<Product[]> {
    const response = await axiosInstance.get<Product[]>('/products', { params });
    return response.data;
  }

  async getProduct(id: number): Promise<Product> {
    const response = await axiosInstance.get<Product>(`/products/${id}`);
    return response.data;
  }

  async createProduct(data: ProductCreateDto): Promise<Product> {
    const response = await axiosInstance.post<Product>('/products', data);
    return response.data;
  }

  async updateProduct(id: number, data: ProductUpdateDto): Promise<Product> {
    const response = await axiosInstance.put<Product>(`/products/${id}`, data);
    return response.data;
  }

  async deleteProduct(id: number): Promise<void> {
    await axiosInstance.delete(`/products/${id}`);
  }
}
