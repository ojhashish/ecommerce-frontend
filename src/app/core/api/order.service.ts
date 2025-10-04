import { Injectable } from '@angular/core';
import axiosInstance from './axios-instance';
import { Order, CheckoutResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  async checkout(): Promise<CheckoutResponse> {
    const response = await axiosInstance.post<CheckoutResponse>('/orders/checkout');
    return response.data;
  }

  async getOrders(): Promise<Order[]> {
    const response = await axiosInstance.get<Order[]>('/orders');
    return response.data;
  }

  async getOrder(id: number): Promise<Order> {
    const response = await axiosInstance.get<Order>(`/orders/${id}`);
    return response.data;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const response = await axiosInstance.put<Order>(`/orders/${id}/status`, { status });
    return response.data;
  }

  async getAllOrders(): Promise<Order[]> {
    const response = await axiosInstance.get<Order[]>('/admin/orders');
    return response.data;
  }
}
