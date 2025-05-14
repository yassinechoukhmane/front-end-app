// src/app/auth/request/request.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Request {
  requestNumber: string;
  subject: string;
  category: string;
  details: string;
  qte: number;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
  designation?: string;
}

@Component({
  selector: 'app-latest-requests',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="requests-page">
      <div class="header-section">
        <h1>Dernières Demandes</h1>
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-value">{{ getTotalRequests() }}</div>
            <div class="stat-label">Total Demandes</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ getPendingRequests() }}</div>
            <div class="stat-label">En Attente</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ getApprovedRequests() }}</div>
            <div class="stat-label">Approuvées</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ getRejectedRequests() }}</div>
            <div class="stat-label">Rejetées</div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <div class="filters">
          <input 
            type="text" 
            placeholder="Rechercher une demande..." 
            class="search-input"
            [(ngModel)]="searchTerm"
            (input)="filterRequests()"
          >
          <select 
            class="filter-select"
            [(ngModel)]="statusFilter"
            (change)="filterRequests()"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvées</option>
            <option value="rejected">Rejetées</option>
          </select>
        </div>

        <div *ngIf="filteredRequests.length === 0" class="no-requests">
          <div class="empty-state">
            <span class="empty-icon">📋</span>
            <p>Aucune demande trouvée</p>
          </div>
        </div>

        <div *ngIf="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <div class="requests-list">
          <div *ngFor="let request of filteredRequests" class="request-card" [class.expanded]="request.isExpanded">
            <div class="request-header" (click)="request.isExpanded = !request.isExpanded">
              <div class="request-main-info">
                <span class="request-number">#{{ request.requestNumber }}</span>
                <span class="request-date">{{ request.date | date:'dd MMM yyyy' }}</span>
              </div>
              <div class="status-badge" [class]="request.status">
                {{ getStatusLabel(request.status) }}
              </div>
            </div>

            <div class="request-content">
              <div class="info-row">
                <span class="label">Sujet:</span>
                <span class="value">{{ request.subject }}</span>
              </div>
              <div class="info-row">
                <span class="label">Catégorie:</span>
                <span class="value">{{ request.category }}</span>
              </div>
              <div class="info-row">
                <span class="label">Détails:</span>
                <span class="value">{{ request.details }}</span>
              </div>
              <div class="info-row">
                <span class="label">Quantité:</span>
                <span class="value">{{ request.qte }}</span>
              </div>
              <div *ngIf="request.designation" class="info-row">
                <span class="label">Désignation:</span>
                <span class="value">{{ request.designation }}</span>
              </div>
            </div>

            <div class="action-buttons">
              <button class="approve-btn" (click)="approveRequest(request)">
                ✓ Approuver
              </button>
              <button class="reject-btn" (click)="rejectRequest(request)">
                ✕ Rejeter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .requests-page {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: 100vh;
    }

    .header-section {
      margin-bottom: 2rem;

      h1 {
        font-size: 2rem;
        color: #2d3436;
        margin-bottom: 1.5rem;
        font-weight: 600;
      }
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
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .stat-value {
        font-size: 2rem;
        font-weight: 600;
        color: #2d3436;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        color: #636e72;
        font-size: 0.9rem;
      }
    }

    .content-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;

      .search-input, .filter-select {
        padding: 0.8rem 1rem;
        border: 1px solid #dfe6e9;
        border-radius: 8px;
        font-size: 0.9rem;
        outline: none;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: #74b9ff;
        }
      }

      .search-input {
        flex: 1;
      }

      .filter-select {
        min-width: 150px;
      }
    }

    .requests-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .request-card {
      background: white;
      border-radius: 12px;
      border: 1px solid #dfe6e9;
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
    }

    .request-header {
      padding: 1.5rem;
      background: #f8f9fa;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }

    .request-main-info {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .request-number {
      font-weight: 600;
      color: #2d3436;
    }

    .request-date {
      color: #636e72;
      font-size: 0.9rem;
    }

    .status-badge {
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;

      &.pending {
        background: #ffeaa7;
        color: #b7791f;
      }

      &.approved {
        background: #55efc4;
        color: #00b894;
      }

      &.rejected {
        background: #ff7675;
        color: #d63031;
      }
    }

    .request-content {
      padding: 1.5rem;
      border-top: 1px solid #dfe6e9;
    }

    .info-row {
      display: flex;
      margin-bottom: 1rem;

      .label {
        width: 120px;
        color: #636e72;
        font-size: 0.9rem;
      }

      .value {
        flex: 1;
        color: #2d3436;
      }
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;

      button {
        flex: 1;
        padding: 0.8rem;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;

        &.approve-btn {
          background: #55efc4;
          color: #00b894;

          &:hover {
            background: #00b894;
            color: white;
          }
        }

        &.reject-btn {
          background: #ff7675;
          color: #d63031;

          &:hover {
            background: #d63031;
            color: white;
          }
        }
      }
    }

    .no-requests {
      text-align: center;
      padding: 3rem;
    }

    .empty-state {
      .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
      }

      p {
        color: #636e72;
        font-size: 1.1rem;
      }
    }

    .success-message {
      background-color: #55efc4;
      color: #00b894;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      text-align: center;
      animation: fadeOut 3s forwards;
    }

    @keyframes fadeOut {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; }
    }

    @media (max-width: 768px) {
      .requests-page {
        padding: 1rem;
      }

      .filters {
        flex-direction: column;
      }

      .request-header {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class LatestRequestsComponent implements OnInit {
  requests: Request[] = [];
  filteredRequests: Request[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';
  successMessage: string = '';

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    const savedRequests = localStorage.getItem('purchaseRequests');
    this.requests = savedRequests ? JSON.parse(savedRequests) : [];
    this.filteredRequests = this.requests;
  }

  getTotalRequests() {
    return this.requests.length;
  }

  getPendingRequests() {
    return this.requests.filter(r => r.status === 'pending').length;
  }

  getApprovedRequests() {
    return this.requests.filter(r => r.status === 'approved').length;
  }

  getRejectedRequests() {
    return this.requests.filter(r => r.status === 'rejected').length;
  }

  filterRequests() {
    this.filteredRequests = this.requests.filter(request => {
      const matchesSearch = this.searchTerm ? 
        request.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.requestNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesStatus = this.statusFilter === 'all' ? 
        true : 
        request.status === this.statusFilter;

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
    this.updateRequestStatus(request);
    this.showSuccessMessage(`La demande #${request.requestNumber} a été approuvée avec succès!`);
  }

  rejectRequest(request: Request) {
    const confirmation = confirm('Êtes-vous sûr de vouloir rejeter cette demande ? Cliquez sur Annuler pour revenir en arrière.');
    
    if (!confirmation) {
      return;
    }

    request.status = 'rejected';
    this.updateRequestStatus(request);
    this.showSuccessMessage(`La demande #${request.requestNumber} a été rejetée.`);
  }

  private updateRequestStatus(request: Request) {
    const index = this.requests.findIndex(r => r.requestNumber === request.requestNumber);
    if (index !== -1) {
      this.requests[index] = request;
      localStorage.setItem('purchaseRequests', JSON.stringify(this.requests));
      this.filterRequests();
    }
  }

  private showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}