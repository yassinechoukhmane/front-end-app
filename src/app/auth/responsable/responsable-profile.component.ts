import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResponsableUserService } from './responsable-user.service';

@Component({
  selector: 'app-responsable-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [ResponsableUserService],
  template: `
    <div class="container">
      <div class="profile-header">
        <div class="profile-cover"></div>
        <div class="profile-avatar">
          <div class="avatar">
            <span>{{ getUserInitials() }}</span>
          </div>
        </div>
      </div>

      <div class="profile-content">
        <div class="profile-info">
          <h1>{{ userData.name || 'Responsable' }}</h1>
          <span class="role">Responsable</span>
        </div>

        <div class="info-sections">
          <div class="section">
            <h2>Informations Personnelles</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Nom complet</label>
                <input 
                  type="text" 
                  [(ngModel)]="userData.name" 
                  placeholder="Votre nom"
                >
              </div>
              <div class="info-item">
                <label>Email</label>
                <input 
                  type="email" 
                  [(ngModel)]="userData.email" 
                  placeholder="Votre email"
                >
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Statistiques</h2>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">📝</div>
                <div class="stat-info">
                  <span class="stat-value">{{ userStats.totalRequests || 0 }}</span>
                  <span class="stat-label">Demandes Gérées</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-info">
                  <span class="stat-value">{{ userStats.approvedRequests || 0 }}</span>
                  <span class="stat-label">Demandes Approuvées</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">❌</div>
                <div class="stat-info">
                  <span class="stat-value">{{ userStats.rejectedRequests || 0 }}</span>
                  <span class="stat-label">Demandes Rejetées</span>
                </div>
              </div>
            </div>
          </div>

          <div class="section navigation-section">
            <h2>Navigation</h2>
            <div class="nav-buttons">
              <button class="btn btn-back" (click)="goBack()">
                <i class="icon">⬅️</i> Retour
              </button>
              <button class="btn btn-logout" (click)="logout()">
                <i class="icon">🚪</i> Se déconnecter
              </button>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="btn btn-save" (click)="saveProfile()">
            <i class="icon">💾</i> Enregistrer les modifications
          </button>
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
      height: 200px;
    }

    .profile-cover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(135deg, #3498db, #2980b9);
    }

    .profile-avatar {
      position: absolute;
      bottom: -50px;
      left: 50px;
    }

    .avatar {
      width: 100px;
      height: 100px;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 4px solid #ffffff;
    }

    .avatar span {
      font-size: 36px;
      font-weight: 600;
      color: #3498db;
    }

    .profile-content {
      padding: 70px 40px 40px;
    }

    .profile-info {
      margin-bottom: 40px;
      text-align: center;
    }

    .profile-info h1 {
      font-size: 28px;
      color: #2c3e50;
      margin: 0;
    }

    .role {
      color: #7f8c8d;
      font-size: 16px;
    }

    .info-sections {
      display: grid;
      gap: 30px;
      max-width: 800px;
      margin: 0 auto;
    }

    .section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #e9ecef;
    }

    .section h2 {
      color: #2c3e50;
      font-size: 20px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e9ecef;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .info-item label {
      font-size: 14px;
      color: #7f8c8d;
      font-weight: 500;
    }

    .info-item input {
      padding: 12px;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      font-size: 15px;
      transition: all 0.3s ease;
    }

    .info-item input:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
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
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .stat-icon {
      font-size: 24px;
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: #2c3e50;
    }

    .stat-label {
      font-size: 14px;
      color: #7f8c8d;
    }

    .navigation-section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #e9ecef;
    }

    .nav-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 10px;
    }

    .btn {
      padding: 12px 30px;
      border: none;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .btn-back {
      background: #95a5a6;
      color: white;
      min-width: 150px;
      justify-content: center;
    }

    .btn-back:hover {
      background: #7f8c8d;
      transform: translateY(-2px);
    }

    .btn-logout {
      background: #e74c3c;
      color: white;
      min-width: 150px;
      justify-content: center;
    }

    .btn-logout:hover {
      background: #c0392b;
      transform: translateY(-2px);
    }

    .btn-save {
      background: #3498db;
      color: white;
    }

    .btn-save:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }

    .icon {
      font-size: 18px;
    }

    .actions {
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }

    .alert {
      margin-top: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      text-align: center;
    }

    .alert.success {
      background: #d4edda;
      color: #155724;
    }

    .alert.error {
      background: #f8d7da;
      color: #721c24;
    }
  `]
})
export class ResponsableProfileComponent implements OnInit {
  userData: any = {
    name: '',
    email: ''
  };

  userStats: any = {
    totalRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0
  };

  message: string = '';
  messageType: string = '';

  constructor(
    private userService: ResponsableUserService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    this.userData = {
      name: user.username || '',
      email: user.email || ''
    };
    this.loadStats();
  }

  getUserInitials(): string {
    return this.userData.name
      ? this.userData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
      : 'R';
  }

  loadStats() {
    // Ici vous pouvez charger les statistiques réelles si nécessaire
    this.userStats = {
      totalRequests: 0,
      approvedRequests: 0,
      rejectedRequests: 0
    };
  }

  saveProfile() {
    this.userService.updateUser(this.userData);
    this.showMessage('Profil mis à jour avec succès', 'success');
  }

  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }

  goBack() {
    this.router.navigate(['/responsable']);
  }

  logout() {
    // Clear user data from localStorage
    localStorage.clear();
    // Navigate to login page
    this.router.navigate(['/login']);
  }
} 