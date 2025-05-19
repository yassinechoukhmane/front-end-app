import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Request {
  requestNumber: string;
  date: Date;
  details: string;
  qte: number;
  status: 'pending' | 'approved' | 'rejected';
  username?: string;
}

@Component({
  selector: 'app-director-purchase-requests',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <header class="page-header">
        <h1>Demandes d'Achat</h1>
        <div class="header-actions">
          <div class="search-box">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              (input)="filterRequests()"
              placeholder="Rechercher des demandes..."
            >
            <i class="fas fa-search"></i>
          </div>
          <button class="back-button" routerLink="/directeur">
            <i class="fas fa-arrow-left"></i>
            Retour au Tableau de Bord
          </button>
        </div>
      </header>

      <div class="stats-cards">
        <div class="stat-card">
          <h3>{{totalRequests}}</h3>
          <p>Total des Demandes</p>
        </div>
        <div class="stat-card">
          <h3>{{pendingRequests}}</h3>
          <p>En Attente</p>
        </div>
        <div class="stat-card">
          <h3>{{approvedRequests}}</h3>
          <p>Approuvées</p>
        </div>
        <div class="stat-card">
          <h3>{{rejectedRequests}}</h3>
          <p>Rejetées</p>
        </div>
      </div>

      <div class="content">
        <div class="requests-list">
          <div *ngFor="let request of filteredRequests" class="request-card">
            <div class="request-header">
              <h3>Demande #{{request.requestNumber}}</h3>
              <span class="request-user">Demandeur : {{ request.username || 'N/A' }}</span>
              <span class="status-badge" [ngClass]="request.status">
                {{getStatusLabel(request.status)}}
              </span>
            </div>
            
            <div class="request-details">
              <div class="detail-row">
                <div class="detail-group">
                  <label>Quantité :</label>
                  <p>{{request.qte}}</p>
                </div>
                <div class="detail-group">
                  <label>Date :</label>
                  <p>{{request.date | date:'dd/MM/yyyy HH:mm'}}</p>
                </div>
              </div>

              <div class="detail-group full-width">
                <label>Détails :</label>
                <p>{{request.details}}</p>
              </div>
            </div>

            <div class="request-actions" *ngIf="request.status === 'pending'">
              <button class="approve-button" (click)="approveRequest(request)">
                <i class="fas fa-check"></i>
                Approuver
              </button>
              <button class="reject-button" (click)="rejectRequest(request)">
                <i class="fas fa-times"></i>
                Rejeter
              </button>
            </div>
            <div class="request-actions">
              <button class="btn-delete" (click)="deleteRequest(request)">
                <span class="icon"></span> Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e9ecef;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .search-box {
      position: relative;
      width: 300px;
    }

    .search-box input {
      width: 100%;
      padding: 0.5rem 1rem;
      padding-left: 2.5rem;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      font-size: 0.9rem;
    }

    .search-box i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #95a5a6;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      text-align: center;
    }

    .stat-card h3 {
      color: #2c3e50;
      font-size: 2rem;
      margin: 0 0 0.5rem 0;
    }

    .stat-card p {
      color: #7f8c8d;
      margin: 0;
      font-size: 0.9rem;
    }

    .requests-list {
      display: grid;
      gap: 1.5rem;
    }

    .request-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .request-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .request-header h3 {
      color: #2c3e50;
      margin: 0;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .status-badge {
      padding: 0.25rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .status-badge.pending {
      background: #ffeaa7;
      color: #d35400;
    }

    .status-badge.approved {
      background: #55efc4;
      color: #00b894;
    }

    .status-badge.rejected {
      background: #ff7675;
      color: #d63031;
    }

    .request-details {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .detail-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .detail-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .detail-group.full-width {
      grid-column: 1 / -1;
    }

    .detail-group label {
      color: #7f8c8d;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .detail-group p {
      color: #2c3e50;
      margin: 0;
      font-size: 1rem;
    }

    .request-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e9ecef;
    }

    .approve-button, .reject-button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .approve-button {
      background: #00b894;
      color: white;
    }

    .approve-button:hover {
      background: #00a187;
      transform: translateY(-2px);
    }

    .reject-button {
      background: #d63031;
      color: white;
    }

    .reject-button:hover {
      background: #c12e2e;
      transform: translateY(-2px);
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .back-button:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }

    .btn-delete {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 1.2rem;
      font-weight: 500;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(231, 76, 60, 0.08);
      transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
    }
    .btn-delete:hover {
      background: linear-gradient(135deg, #c0392b, #a93226);
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(192, 57, 43, 0.15);
    }

    .request-user {
      font-size: 15px;
      color: #3949ab;
      font-weight: 500;
      margin-left: 10px;
    }
  `]
})
export class DirectorPurchaseRequestsComponent implements OnInit {
  requests: Request[] = [];
  filteredRequests: Request[] = [];
  searchTerm: string = '';

  totalRequests: number = 0;
  pendingRequests: number = 0;
  approvedRequests: number = 0;
  rejectedRequests: number = 0;

  constructor() {}

  ngOnInit() {
    this.loadRequests();
    this.updateStats();
  }

  loadRequests() {
    const requestsStr = localStorage.getItem('purchaseRequests');
    if (requestsStr) {
      this.requests = JSON.parse(requestsStr);
      this.filteredRequests = [...this.requests];
      this.updateStats();
      console.log('Demandes chargées dans director:', this.requests);
    }
  }

  filterRequests() {
    if (!this.searchTerm.trim()) {
      this.filteredRequests = [...this.requests];
    } else {
      const searchTerm = this.searchTerm.toLowerCase();
      this.filteredRequests = this.requests.filter(request =>
        request.requestNumber.toLowerCase().includes(searchTerm) ||
        request.details.toLowerCase().includes(searchTerm)
      );
    }
    this.updateStats();
  }

  updateStats() {
    this.totalRequests = this.requests.length;
    this.pendingRequests = this.requests.filter(r => r.status === 'pending').length;
    this.approvedRequests = this.requests.filter(r => r.status === 'approved').length;
    this.rejectedRequests = this.requests.filter(r => r.status === 'rejected').length;
    console.log('Stats updated:', {
      total: this.totalRequests,
      pending: this.pendingRequests,
      approved: this.approvedRequests,
      rejected: this.rejectedRequests
    });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending':
        return 'En Attente';
      case 'approved':
        return 'Approuvée';
      case 'rejected':
        return 'Rejetée';
      default:
        return status;
    }
  }

  approveRequest(request: Request) {
    request.status = 'approved';
    this.saveRequests();
  }

  rejectRequest(request: Request) {
    request.status = 'rejected';
    this.saveRequests();
  }

  saveRequests() {
    localStorage.setItem('purchaseRequests', JSON.stringify(this.requests));
    this.updateStats();
  }

  deleteRequest(request: Request) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.requests = this.requests.filter(r => r !== request);
      localStorage.setItem('purchaseRequests', JSON.stringify(this.requests));
      this.filterRequests();
      this.updateStats();
    }
  }
} 