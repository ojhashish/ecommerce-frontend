import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../core/api/order.service';
import { Order } from '../../core/models/order.model';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSelectModule, MatChipsModule, FormsModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="page-container">
      <h1>Order Management</h1>
      <mat-table [dataSource]="orders">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>Order ID</th>
          <td mat-cell *matCellDef="let order">{{ order.id }}</td>
        </ng-container>
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let order">{{ order.createdAt | date:'short' }}</td>
        </ng-container>
        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef>Total</th>
          <td mat-cell *matCellDef="let order">\${{ order.total_amount }}</td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let order">
            <mat-chip-set>
              <mat-chip [highlighted]="true">{{ order.status }}</mat-chip>
            </mat-chip-set>
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let order">
            <mat-select [(ngModel)]="order.status" (selectionChange)="updateStatus(order)">
              <mat-option value="PENDING">Pending</mat-option>
              <mat-option value="CONFIRMED">Confirmed</mat-option>
              <mat-option value="SHIPPED">Shipped</mat-option>
              <mat-option value="DELIVERED">Delivered</mat-option>
              <mat-option value="CANCELLED">Cancelled</mat-option>
            </mat-select>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </mat-table>
    </div>
  `,
  styles: [`
    mat-table { width: 100%; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 20px; }
  `]
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns = ['id', 'date', 'total', 'status', 'actions'];

  constructor(private orderService: OrderService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadOrders();
  }

  async loadOrders() {
    try {
      this.orders = await this.orderService.getAllOrders();
    } catch (error: any) {
      this.toastr.error('Failed to load orders', 'Error');
    }
  }

  async updateStatus(order: Order) {
    try {
      await this.orderService.updateOrderStatus(order.id, order.status);
      this.toastr.success('Order status updated', 'Success');
    } catch (error: any) {
      this.toastr.error('Failed to update status', 'Error');
    }
  }
}
