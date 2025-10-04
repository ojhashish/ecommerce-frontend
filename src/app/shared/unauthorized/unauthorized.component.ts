import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="unauthorized-container">
      <mat-card>
        <mat-card-content>
          <mat-icon color="warn">lock</mat-icon>
          <h1>Access Denied</h1>
          <p>You don't have permission to access this page.</p>
          <button mat-raised-button color="primary" routerLink="/">Go Home</button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f5f5f5;
      
      mat-card {
        text-align: center;
        padding: 40px;
        
        mat-icon {
          font-size: 64px;
          width: 64px;
          height: 64px;
          margin-bottom: 20px;
        }
        
        h1 {
          margin-bottom: 10px;
        }
        
        p {
          color: #666;
          margin-bottom: 30px;
        }
      }
    }
  `]
})
export class UnauthorizedComponent {}
