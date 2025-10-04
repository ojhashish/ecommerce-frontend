import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../core/api/order.service';
import { Order } from '../../core/models/order.model';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule, HeaderComponent],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.params['id'];
    this.loadOrder(orderId);
  }

  async loadOrder(id: number) {
    this.loading = true;
    try {
      this.order = await this.orderService.getOrder(id);
    } catch (error: any) {
      this.toastr.error('Failed to load order details', 'Error');
    } finally {
      this.loading = false;
    }
  }
}
