// src/app/auth/request/request.component.ts
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
  selector: 'app-latest-requests',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  template: `
    <div class="requests-container">
      <div class="stats-cards">
        <div class="stat-card">
          <h2>{{ totalRequests }}</h2>
          <p>Total Demandes</p>
        </div>
        <div class="stat-card">
          <h2>{{ pendingRequests }}</h2>
          <p>En Attente</p>
        </div>
        <div class="stat-card">
          <h2>{{ approvedRequests }}</h2>
          <p>Approuvées</p>
        </div>
        <div class="stat-card">
          <h2>{{ rejectedRequests }}</h2>
          <p>Rejetées</p>
        </div>
      </div>

      <div class="filters">
        <input 
          type="text" 
          placeholder="Rechercher une demande..." 
          class="search-input"
          [(ngModel)]="searchTerm"
        >
        <select [(ngModel)]="statusFilter" class="status-filter">
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvée</option>
          <option value="rejected">Rejetée</option>
        </select>
      </div>

      <div class="request-cards">
        <div class="request-card" *ngFor="let request of getFilteredRequests()">
          <div class="request-header">
            <div class="request-id">
              <span class="label">#{{ request.requestNumber }}</span>
              <span class="request-user">Demandeur : {{ request.username || 'N/A' }}</span>
              <span class="date">{{ request.date | date:'dd MMM yyyy' }}</span>
            </div>
            <div [class]="'status-badge status-' + request.status">
              {{ getStatusLabel(request.status) }}
            </div>
          </div>

          <div class="request-body">
            <div class="info-row">
              <label>Description:</label>
              <span>{{ request.details }}</span>
            </div>
            <div class="info-row">
              <label>Quantité:</label>
              <span>{{ request.qte }}</span>
            </div>
          </div>

          <div class="request-actions">
            <ng-container *ngIf="request.status === 'pending'">
              <button class="btn-approve" (click)="approveRequest(request)">
                ✓ Approuver
              </button>
              <button class="btn-reject" (click)="rejectRequest(request)">
                ✕ Rejeter
              </button>
            </ng-container>
            <ng-container *ngIf="request.status === 'approved' || request.status === 'rejected'">
              <button class="btn-delete" (click)="deleteRequest(request)">
                 Supprimer
              </button>
            </ng-container>
          </div>
        </div>
      </div>

      <div *ngIf="getFilteredRequests().length === 0" class="no-data">
        Aucune demande disponible
      </div>
    </div>
  `,
  styles: [`
    .requests-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .stat-card h2 {
      font-size: 28px;
      color: #2c3e50;
      margin: 0;
    }

    .stat-card p {
      color: #7f8c8d;
      margin: 5px 0 0;
    }

    .filters {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }

    .search-input {
      flex: 1;
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }

    .status-filter {
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      min-width: 150px;
    }

    .request-cards {
      display: grid;
      gap: 20px;
    }

    .request-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .request-header {
      padding: 15px 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .request-id {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .label {
      font-weight: 600;
      color: #2c3e50;
    }

    .request-user {
      font-size: 15px;
      color: #3949ab;
      font-weight: 500;
      margin-left: 10px;
    }

    .date {
      color: #7f8c8d;
      font-size: 14px;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-pending {
      background-color: #ffeaa7;
      color: #fdcb6e;
    }

    .status-approved {
      background-color: #55efc4;
      color: #00b894;
    }

    .status-rejected {
      background-color: #ff7675;
      color: #d63031;
    }

    .request-body {
      padding: 20px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
    }

    .info-row label {
      color: #7f8c8d;
      font-size: 14px;
    }

    .info-row span {
      font-weight: 500;
      color: #2c3e50;
    }

    .request-actions {
      display: flex;
      gap: 10px;
      padding: 20px;
      background: #f8f9fa;
    }

    .btn-approve, .btn-reject {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-approve {
      background: #55efc4;
      color: white;
    }

    .btn-approve:hover {
      background: #00b894;
    }

    .btn-reject {
      background: #ff7675;
      color: white;
    }

    .btn-reject:hover {
      background: #d63031;
    }

    .btn-delete {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: #95a5a6;
      color: white;
    }

    .btn-delete:hover {
      background: #7f8c8d;
      transform: translateY(-2px);
    }
  `]
})
export class LatestRequestsComponent implements OnInit {
  requests: Request[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';
  totalRequests: number = 0;
  pendingRequests: number = 0;
  approvedRequests: number = 0;
  rejectedRequests: number = 0;

  ngOnInit() {
    this.loadRequests();
    this.updateStats();
  }

  loadRequests() {
    const stored = localStorage.getItem('purchaseRequests');
    if (stored) {
      this.requests = JSON.parse(stored);
      console.log('Demandes chargées:', this.requests);
    }
  }

  updateStats() {
    this.totalRequests = this.requests.length;
    this.pendingRequests = this.requests.filter(r => r.status === 'pending').length;
    this.approvedRequests = this.requests.filter(r => r.status === 'approved').length;
    this.rejectedRequests = this.requests.filter(r => r.status === 'rejected').length;
  }

  getFilteredRequests(): Request[] {
    return this.requests.filter(request => {
      const matchesSearch = 
        request.requestNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.details.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || request.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      default: return status;
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

  deleteRequest(request: Request) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.requests = this.requests.filter(r => r.requestNumber !== request.requestNumber);
      this.saveRequests();
    }
  }

  private saveRequests() {
    localStorage.setItem('purchaseRequests', JSON.stringify(this.requests));
    this.updateStats();
  }
}