import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-projet-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="projects-container">
      <div class="header">
        <h2>Mes Demandes de Projet</h2>
        <div class="actions">
          <button class="create-button" (click)="createNewRequest()">
            Nouvelle Demande
          </button>
        <button class="home-button" (click)="goToHome()">Home</button>
        </div>
      </div>

      <div class="stats-cards">
        <div class="stat-card">
          <h3>{{ totalDemandes }}</h3>
          <p>Total Demandes</p>
        </div>
        <div class="stat-card">
          <h3>{{ demandesEnAttente }}</h3>
          <p>En Attente</p>
        </div>
        <div class="stat-card">
          <h3>{{ demandesApprouvees }}</h3>
          <p>Approuvées</p>
        </div>
        <div class="stat-card">
          <h3>{{ demandesRejetees }}</h3>
          <p>Rejetées</p>
        </div>
      </div>

      <div class="projects-grid">
        <div *ngFor="let demande of demandesProjets" class="project-card">
          <div class="project-header">
            <div class="project-title">
              <h3>{{ demande.name }}</h3>
              <p class="project-date">{{demande.date | date:'dd MMM yyyy'}}</p>
            </div>
            <span class="status-badge" [ngClass]="demande.status">
              {{getStatusLabel(demande.status)}}
            </span>
          </div>

          <div class="project-details">
            <div class="detail-item">
              <strong>Description:</strong>
              <span>{{demande.description}}</span>
            </div>
            <div class="detail-item">
              <strong>Demande d'achat ID:</strong>
              <span>{{demande.demandeAchatId}}</span>
            </div>
            <div class="detail-item">
              <strong>Projet ID:</strong>
              <span>{{demande.projetId}}</span>
            </div>
          </div>

          <div class="request-actions">
            <ng-container *ngIf="demande.status === 'draft'">
              <button class="submit-btn" (click)="submitDemande(demande)">
              Soumettre
            </button>
            </ng-container>
            <button class="delete-button" (click)="deleteDemande(demande)">
              <i class="fas fa-trash"></i>
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="demandesProjets.length === 0" class="no-data">
        Aucune demande de projet disponible
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      padding: 2rem;
      background-color: #f5f5f5;
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header h2 {
      color: #2c3e50;
      font-size: 1.8rem;
      margin: 0;
      font-weight: 600;
    }

    .actions {
      display: flex;
      gap: 1rem;
    }

    .create-button {
      padding: 10px 20px;
      background-color: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .create-button:hover {
      background-color: #27ae60;
      transform: translateY(-2px);
    }

    .home-button {
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .home-button:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-card h3 {
      font-size: 2rem;
      color: #2c3e50;
      margin: 0 0 0.5rem 0;
    }

    .stat-card p {
      color: #7f8c8d;
      margin: 0;
      font-size: 1rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .project-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .project-header {
      padding: 1.5rem;
      background: #f8f9fa;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .project-title h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    .project-date {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin: 0.5rem 0 0 0;
    }

    .status-badge {
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .issued {
      background-color: #ffeaa7;
      color: #fdcb6e;
    }

    .received {
      background-color: #55efc4;
      color: #00b894;
    }

    .cancelled {
      background-color: #ff7675;
      color: #d63031;
    }

    .draft {
      background-color: #a0aec0;
      color: #4a5568;
    }

    .project-details {
      padding: 1.5rem;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 6px;
      margin-bottom: 0.75rem;
    }

    .detail-item:last-child {
      margin-bottom: 0;
    }

    .detail-item strong {
      color: #2c3e50;
      font-weight: 600;
      flex: 0 0 30%;
    }

    .detail-item span {
      color: #34495e;
      flex: 0 0 65%;
      text-align: right;
    }

    .request-actions {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      border-top: 1px solid #eee;
    }

    .submit-btn, .delete-button {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .submit-btn {
      background-color: #55efc4;
      color: white;
    }

    .submit-btn:hover {
      background-color: #00b894;
    }

    .delete-button {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(231, 76, 60, 0.08);
      transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
    }

    .delete-button:hover {
      background: linear-gradient(135deg, #c0392b, #a93226);
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(192, 57, 43, 0.15);
    }

    .no-data {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 10px;
      color: #7f8c8d;
      font-size: 1.1rem;
      margin-top: 2rem;
    }

    @media (max-width: 1024px) {
      .stats-cards {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .projects-container {
        padding: 1rem;
      }

      .stats-cards {
        grid-template-columns: 1fr;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }

      .detail-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .detail-item strong {
        margin-bottom: 0.5rem;
      }

      .detail-item span {
        text-align: left;
      }
    }
  `]
})
export class DemandeProjetListComponent implements OnInit {
  demandesProjets: any[] = [];
  totalDemandes: number = 0;
  demandesEnAttente: number = 0;
  demandesApprouvees: number = 0;
  demandesRejetees: number = 0;
  currentUser: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.loadDemandesProjets();
  }

  loadDemandesProjets() {
    const demandes = JSON.parse(localStorage.getItem('demandes_projet') || '[]');
    this.demandesProjets = demandes.filter((demande: any) => 
      demande.responsableId === this.currentUser.id || 
      demande.responsableEmail === this.currentUser.email
    );

    // Calculer les statistiques
    this.totalDemandes = this.demandesProjets.length;
    this.demandesEnAttente = this.demandesProjets.filter(d => d.status === 'issued').length;
    this.demandesApprouvees = this.demandesProjets.filter(d => d.status === 'received').length;
    this.demandesRejetees = this.demandesProjets.filter(d => d.status === 'cancelled').length;
      }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'issued': return 'En attente';
      case 'received': return 'Approuvée';
      case 'cancelled': return 'Rejetée';
      default: return status;
    }
  }

  submitDemande(demande: any) {
    demande.status = 'issued';
    this.saveDemandes();
    this.loadDemandesProjets(); // Recharger les statistiques
  }

  deleteDemande(demande: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.demandesProjets = this.demandesProjets.filter(d => d !== demande);
      this.saveDemandes();
      this.loadDemandesProjets(); // Recharger les statistiques
    }
  }

  saveDemandes() {
    const allDemandes = JSON.parse(localStorage.getItem('demandes_projet') || '[]');
    const otherDemandes = allDemandes.filter((d: any) => 
      d.responsableId !== this.currentUser.id && 
      d.responsableEmail !== this.currentUser.email
    );
    const updatedDemandes = [...otherDemandes, ...this.demandesProjets];
    localStorage.setItem('demandes_projet', JSON.stringify(updatedDemandes));
  }

  createNewRequest() {
    this.router.navigate(['/create-demande-projet']);
  }

  goToHome() {
      this.router.navigate(['/responsable']);
  }
} 