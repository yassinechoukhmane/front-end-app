import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-directeur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo">
          <h2>Target Metal Works</h2>
        </div>
        
        <div class="menu-section">
          <h3>DÉCOUVRIR</h3>
          <ul>
            <li>
              <a class="nav-link" routerLink="/directeur">
                <i class="fas fa-home"></i>
                Accueil
              </a>
            </li>
          </ul>
        </div>

        <div class="menu-section">
          <h3>GESTION</h3>
          <ul>
            <li>
              <a class="nav-link" routerLink="/directeur/purchase-requests">
                <i class="fas fa-list"></i>
                Toutes les Demandes d'achats
              </a>
            </li>
            <li>
              <a class="nav-link" (click)="goToProjectRequests()">
                <i class="fas fa-project-diagram"></i>
                Toutes les Demandes de Projets
              </a>
            </li>
            <li>
              <a class="nav-link" routerLink="/directeur/projects">
                <i class="fas fa-tasks"></i>
                Tous les Projets
              </a>
            </li>
            <li>
              <a class="nav-link" routerLink="/directeur/suppliers">
                <i class="fas fa-users"></i>
                Tous les Fournisseurs
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <header class="top-bar">
          <div class="date">{{today | date:'dd/MM/yyyy'}}</div>
          <a class="profile-link" routerLink="/directeur/profile">
            <i class="fas fa-user"></i>
            <span class="user-info">Directeur</span>
          </a>
        </header>

        <div class="content">
          <div class="welcome-text">Bienvenue M / Mme</div>
          
          <h2 class="page-title">ACCUEIL :</h2>

          <div class="cards-grid">
            <!-- All Cards in One Row -->
            <div class="card-row">
              <div class="card">
                <h3>Dernières Demandes</h3>
                <p class="card-description">Voir toutes les demandes d'achat récentes</p>
                <button routerLink="/directeur/purchase-requests" class="action-button">
                  <i class="fas fa-eye"></i>
                  CONSULTER
                </button>
              </div>

              <div class="card">
                <h3>Projets</h3>
                <p class="card-description">Gérer tous les projets</p>
                <button routerLink="/directeur/projects" class="action-button">
                  <i class="fas fa-tasks"></i>
                  VOIR PROJETS
                </button>
              </div>

              <div class="card">
                <h3>Demandes de Projets</h3>
                <p class="card-description">Gérer les demandes de projets</p>
                <button (click)="goToProjectRequests()" class="action-button">
                  <i class="fas fa-project-diagram"></i>
                  VOIR DEMANDES
                </button>
              </div>

              <div class="card">
                <h3>Fournisseurs</h3>
                <p class="card-description">Voir la liste des fournisseurs</p>
                <button routerLink="/directeur/suppliers" class="action-button">
                  <i class="fas fa-users"></i>
                  VOIR FOURNISSEURS
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .sidebar {
      width: 280px;
      background: #2c3e50;
      color: white;
      padding: 2rem;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .logo h2 {
      color: #3498db;
      font-size: 1.5rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    }

    .menu-section {
      margin-bottom: 2rem;
    }

    .menu-section h3 {
      color: #95a5a6;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 1rem;
    }

    .menu-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0.8rem 1rem;
      color: #ecf0f1;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }

    .nav-link:hover {
      background: rgba(52, 152, 219, 0.2);
      color: #3498db;
      transform: translateX(5px);
    }

    .main-content {
      flex: 1;
      padding: 2rem;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      margin-bottom: 2rem;
    }

    .date {
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .profile-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0.5rem 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      text-decoration: none;
      color: #2c3e50;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .profile-link:hover {
      background: #e9ecef;
      transform: translateY(-2px);
    }

    .content {
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .welcome-text {
      color: #7f8c8d;
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .page-title {
      color: #2c3e50;
      font-size: 1.8rem;
      margin-bottom: 2rem;
      font-weight: 600;
    }

    .cards-grid {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .card-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .card h3 {
      color: #2c3e50;
      font-size: 1.3rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .card-description {
      color: #7f8c8d;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .action-button {
      width: 100%;
      padding: 1rem;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .action-button:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }

    @media (max-width: 1024px) {
      .card-row {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .layout {
        flex-direction: column;
      }

      .sidebar {
        width: 100%;
        padding: 1rem;
      }

      .main-content {
        padding: 1rem;
      }
    }
  `]
})
export class DirecteurComponent implements OnInit {
  today: Date = new Date();

  constructor(private router: Router) {}

  ngOnInit() {
    // Simuler un utilisateur directeur pour le développement
    const user = {
      email: 'directeur@example.com',
      role: 'directeur',
      fullName: 'Directeur Général'
    };
    localStorage.setItem('user', JSON.stringify(user));
  }

  goToProjectRequests() {
    this.router.navigateByUrl('/directeur/project-requests', { 
      skipLocationChange: false,
      replaceUrl: true
    });
  }
} 