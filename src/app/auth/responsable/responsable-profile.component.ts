import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-responsable-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar">
            <img src="assets/target.png" alt="Target Metal Works Logo" class="logo-image">
          </div>
          <h1>{{fullName || 'Profil Responsable'}}</h1>
        </div>

        <div class="profile-content">
          <div class="form-group">
            <label>
              <i class="fas fa-user"></i>
              Nom Complet
            </label>
            <input 
              type="text" 
              [(ngModel)]="fullName" 
              (ngModelChange)="updateProfile()"
              placeholder="Entrez votre nom complet"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label>
              <i class="fas fa-envelope"></i>
              Adresse Email
            </label>
            <input 
              type="email" 
              [(ngModel)]="email" 
              (ngModelChange)="updateProfile()"
              placeholder="Entrez votre email"
              class="form-control"
            >
          </div>

          <div class="profile-actions">
            <button class="btn btn-back" (click)="goBack()">
              <i class="fas fa-arrow-left"></i>
              Retour
            </button>
            <button class="btn btn-logout" (click)="logout()">
              <i class="fas fa-sign-out-alt"></i>
              Se Déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 2rem;
    }

    .profile-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 600px;
      overflow: hidden;
    }

    .profile-header {
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
      padding: 2rem;
      text-align: center;
    }

    .avatar {
      width: 120px;
      height: 120px;
      background: white;
      border-radius: 15px;
      margin: 0 auto 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      padding: 10px;
    }

    .avatar i {
      font-size: 50px;
      color: #3498db;
    }

    h1 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .profile-content {
      padding: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-group label i {
      color: #3498db;
    }

    .form-control {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 2px solid #e9ecef;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .profile-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .btn i {
      font-size: 1.1rem;
    }

    .btn-back {
      background: #e9ecef;
      color: #2c3e50;
    }

    .btn-back:hover {
      background: #dee2e6;
      transform: translateY(-2px);
    }

    .btn-logout {
      background: #e74c3c;
      color: white;
    }

    .btn-logout:hover {
      background: #c0392b;
      transform: translateY(-2px);
    }

    @media (max-width: 480px) {
      .profile-actions {
        flex-direction: column;
      }

      .profile-card {
        margin: 1rem;
      }
    }

    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 0;
    }
  `]
})
export class ResponsableProfileComponent implements OnInit {
  fullName: string = '';
  email: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Charger les données du profil depuis le localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.fullName = user.fullName || '';
      this.email = user.email || '';
    }
  }

  updateProfile() {
    // Mettre à jour les données dans le localStorage
    const userData = {
      fullName: this.fullName,
      email: this.email
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  goBack() {
    this.router.navigate(['/responsable']);
  }

  logout() {
    // Supprimer les données de l'utilisateur
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
} 