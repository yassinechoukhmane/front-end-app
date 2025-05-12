// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../demandeur/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="profile-container">
      <h2>User Profile</h2>
      
      <div class="profile-info">
        <div class="info-item">
          <span class="label">Username:</span>
          <span class="value">{{ user?.username || 'N/A' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Email:</span>
          <span class="value">{{ user?.email || 'N/A' }}</span>
        </div>
      </div>

      <button (click)="goBack()" class="btn btn-back">Back to home </button>

    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    h2 {
      color: #2f3542;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .profile-info {
      margin-bottom: 20px;
    }
    
    .info-item {
      display: flex;
      margin-bottom: 10px;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 4px;
    }
    
    .label {
      font-weight: 500;
      min-width: 100px;
      color: #2f3542;
    }
    
    .value {
      color: #57606f;
    }
    
    .btn-back {
      background: #1e90ff;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .btn-back:hover {
      background: #3742fa;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
  }
  goBack() {
    const lastRoute = this.userService.getLastRoute();
    this.router.navigate([lastRoute]);
  }
}