// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandeurUserService } from './demandeur-user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DemandeurUserService],
  template: `
    <div class="container">
      <div class="profile-header">
        <div class="profile-cover">
          <div class="company-logo">
            <div class="logo-container">
              <img src="assets/target.png" alt="Target Metal Works">
              <div class="company-name">
                <h1>Target</h1>
                <h2>Metal Works</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-avatar">
          <div class="avatar">
            <span>{{ getUserInitials() }}</span>
          </div>
        </div>
      </div>

      <div class="profile-content">
        <div class="profile-info">
          <h1>{{ userData.name || 'Demandeur' }}</h1>
          <span class="role">Demandeur</span>
        </div>

        <div class="info-sections">
          <div class="section personal-info">
            <h2>Informations Personnelles</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Nom complet</label>
                <div class="input-wrapper">
                  <i class="fas fa-user"></i>
                  <input 
                    type="text" 
                    [(ngModel)]="userData.name" 
                    placeholder="Votre nom"
                  >
                </div>
              </div>
              <div class="info-item">
                <label>Email</label>
                <div class="input-wrapper">
                  <i class="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    [(ngModel)]="userData.email" 
                    placeholder="Votre email"
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Statistiques</h2>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">📝</div>
                <div class="stat-info">
                  <span class="stat-value">{{ stats.totalRequests }}</span>
                  <span class="stat-label">Demandes Totales</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">⏳</div>
                <div class="stat-info">
                  <span class="stat-value">{{ stats.pendingRequests }}</span>
                  <span class="stat-label">En Attente</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-info">
                  <span class="stat-value">{{ stats.approvedRequests }}</span>
                  <span class="stat-label">Approuvées</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">❌</div>
                <div class="stat-info">
                  <span class="stat-value">{{ stats.rejectedRequests }}</span>
                  <span class="stat-label">Rejetées</span>
                </div>
              </div>
            </div>
          </div>

          <div class="section navigation-section">
            <div class="nav-buttons">
              <button class="btn btn-back" (click)="goBack()">
                <i class="fas fa-arrow-left"></i> Retour
              </button>
              <button class="btn btn-logout" (click)="logout()">
                <i class="fas fa-sign-out-alt"></i> Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="message" [class]="'alert ' + messageType">
        {{ message }}
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .profile-header {
      position: relative;
      height: 250px;
    }

    .profile-cover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(135deg, #1a2a3a, #2c3e50);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 30px;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0) 100%);
        z-index: 1;
      }
    }

    .company-logo {
      position: relative;
      z-index: 2;
      
      .logo-container {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 15px 25px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        img {
          height: 80px;
          width: auto;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .company-name {
          text-align: left;
          
          h1 {
            font-size: 28px;
            font-weight: 700;
            color: white;
            margin: 0;
            line-height: 1.2;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          h2 {
            font-size: 18px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.9);
            margin: 0;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
        }
      }
    }

    .profile-avatar {
      position: absolute;
      bottom: -50px;
      left: 50%;
      transform: translateX(-50%);
    }

    .avatar {
      width: 120px;
      height: 120px;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 4px solid #ffffff;
    }

    .avatar span {
      font-size: 40px;
      font-weight: 600;
      color: #3498db;
    }

    .profile-content {
      padding: 80px 40px 40px;
    }

    .profile-info {
      margin-bottom: 40px;
      text-align: center;

      h1 {
        font-size: 32px;
        color: #2c3e50;
        margin: 0;
        font-weight: 600;
      }

      .role {
        color: #7f8c8d;
        font-size: 18px;
        margin-top: 5px;
        display: inline-block;
      }
    }

    .info-sections {
      display: grid;
      gap: 30px;
      max-width: 900px;
      margin: 0 auto;
    }

    .section {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 12px;
      border: 1px solid #e9ecef;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
      }

      h2 {
        color: #2c3e50;
        font-size: 22px;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e9ecef;
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .info-item {
      label {
        display: block;
        color: #7f8c8d;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .input-wrapper {
        position: relative;
        
        i {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #95a5a6;
        }

        input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          font-size: 16px;
          color: #2c3e50;
          background-color: #ffffff;
          transition: border-color 0.3s ease;

          &:read-only {
            background-color: #f8f9fa;
            cursor: default;
          }

          &:focus {
            outline: none;
            border-color: #3498db;
          }
        }
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 15px;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }

      .stat-icon {
        font-size: 24px;
        width: 50px;
        height: 50px;
        background: #f0f2f5;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-info {
        flex: 1;

        .stat-value {
          display: block;
          font-size: 24px;
          font-weight: 600;
          color: #2c3e50;
        }

        .stat-label {
          color: #7f8c8d;
          font-size: 14px;
        }
      }
    }

    .nav-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      i {
        font-size: 18px;
      }

      &.btn-back {
        background: #e9ecef;
        color: #2c3e50;

        &:hover {
          background: #dee2e6;
        }
      }

      &.btn-logout {
        background: #e74c3c;
        color: white;

        &:hover {
          background: #c0392b;
        }
      }
    }

    .alert {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      animation: slideIn 0.3s ease;

      &.success {
        background: #2ecc71;
      }

      &.error {
        background: #e74c3c;
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  userData: any = {
    name: '',
    email: '',
  };

  stats = {
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0
  };

  message: string = '';
  messageType: string = '';

  constructor(
    private userService: DemandeurUserService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    this.userData = {
      name: user.username,
      email: user.email || 'email@example.com'
    };
    this.loadStats();
  }

  loadStats() {
    const requests = JSON.parse(localStorage.getItem('purchaseRequests') || '[]');
    this.stats = {
      totalRequests: requests.length,
      pendingRequests: requests.filter((r: any) => r.status === 'pending').length,
      approvedRequests: requests.filter((r: any) => r.status === 'approved').length,
      rejectedRequests: requests.filter((r: any) => r.status === 'rejected').length
    };
  }

  getUserInitials(): string {
    if (!this.userData.name) return '?';
    return this.userData.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  }

  goBack() {
    const lastRoute = this.userService.getLastRoute();
    this.router.navigate([lastRoute || '/demandeur']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}