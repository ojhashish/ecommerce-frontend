import { Injectable } from '@angular/core';
import axiosInstance from './axios-instance';
import { SalesReport } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  async getSalesReport(): Promise<SalesReport> {
    const response = await axiosInstance.get<SalesReport>('/admin/reports/sales');
    return response.data;
  }

  async getStats(): Promise<any> {
    const response = await axiosInstance.get('/admin/reports/stats');
    return response.data;
  }
}
