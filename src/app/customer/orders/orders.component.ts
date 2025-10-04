import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../core/api/order.service';
import { Order } from '../../core/models/order.model';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule, MatProgressSpinnerModule, MatIconModule, RouterModule, HeaderComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  async loadOrders() {
    this.loading = true;
    try {
      this.orders = await this.orderService.getOrders();
    } catch (error: any) {
      this.toastr.error('Failed to load orders', 'Error');
    } finally {
      this.loading = false;
    }
  }

  viewOrder(orderId: number) {
    this.router.navigate(['/orders', orderId]);
  }

  getStatusColor(status: string): string {
    const colors: any = {
      PENDING: 'warn',
      CONFIRMED: 'primary',
      SHIPPED: 'accent',
      DELIVERED: 'primary',
      CANCELLED: 'warn'
    };
    return colors[status] || 'primary';
  }
}
