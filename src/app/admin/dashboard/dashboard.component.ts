import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../core/api/admin.service';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatIconModule, MatProgressSpinnerModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  loading = false;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  async loadStats() {
    this.loading = true;
    try {
      this.stats = await this.adminService.getSalesReport();
    } catch (error: any) {
      this.toastr.error('Failed to load dashboard stats', 'Error');
    } finally {
      this.loading = false;
    }
  }
}
