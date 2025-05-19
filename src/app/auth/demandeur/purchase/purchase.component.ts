import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Purchase {
  requestNumber: string;
  qte: number;
  details: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
  username?: string;
}

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <h2>Liste des Achats</h2>
      
      <div class="search-section">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          placeholder="Rechercher un achat..."
          class="search-input"
        >
      </div>

      <div class="purchases-list">
        <div *ngIf="purchases.length === 0" class="no-purchases">
          Aucun achat enregistré.
        </div>

        <div *ngFor="let purchase of filteredPurchases" class="purchase-item">
          <div class="purchase-header">
            <div class="purchase-title">
              <span class="purchase-id">ID: {{ purchase.requestNumber }}</span>
              <span class="purchase-user">Demandeur : {{ purchase.username || 'N/A' }}</span>
              <span class="purchase-status" [ngClass]="purchase.status">
                {{ getStatusLabel(purchase.status) }}
              </span>
            </div>
            <span class="purchase-date">{{ purchase.date | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>
          
          <div class="purchase-details">
            <div class="detail-row">
              <div class="detail-group">
                <label>Quantité:</label>
                <span>{{ purchase.qte }}</span>
              </div>
              <div class="detail-group">
                <label>Description:</label>
                <span>{{ purchase.details }}</span>
              </div>
            </div>
          </div>

          <div class="purchase-actions">
            <button class="btn-delete" (click)="deletePurchase(purchase)">
               Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #1a237e;
      margin-bottom: 30px;
      text-align: center;
      font-size: 28px;
      font-weight: 600;
      position: relative;
      padding-bottom: 10px;
    }

    h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background: linear-gradient(to right, #1a237e, #3949ab);
      border-radius: 2px;
    }

    .search-section {
      margin-bottom: 25px;
    }

    .search-input {
      width: 100%;
      padding: 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s ease;
      background-color: #f8f9fa;
    }

    .search-input:focus {
      border-color: #3949ab;
      box-shadow: 0 0 0 3px rgba(57, 73, 171, 0.1);
      outline: none;
    }

    .purchases-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .purchase-item {
      background: #ffffff;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid #e0e0e0;
      transition: all 0.3s ease;
    }

    .purchase-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .purchase-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f5f5f5;
    }

    .purchase-title {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .purchase-id {
      font-size: 18px;
      font-weight: 600;
      color: #1a237e;
    }

    .purchase-user {
      font-size: 15px;
      color: #3949ab;
      font-weight: 500;
      margin-left: 10px;
    }

    .purchase-status {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .purchase-status.pending {
      background-color: #fff3e0;
      color: #e65100;
    }

    .purchase-status.approved {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .purchase-status.rejected {
      background-color: #ffebee;
      color: #c62828;
    }

    .purchase-date {
      color: #757575;
      font-size: 14px;
      font-weight: 500;
    }

    .purchase-details {
      padding: 10px 0;
    }

    .detail-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 10px;
    }

    .detail-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .detail-group label {
      font-weight: 600;
      color: #424242;
      font-size: 14px;
    }

    .detail-group span {
      color: #616161;
      font-size: 16px;
    }

    .no-purchases {
      text-align: center;
      padding: 30px;
      background: #f8f9fa;
      border-radius: 8px;
      color: #757575;
      font-style: italic;
      border: 2px dashed #e0e0e0;
    }

    .purchase-actions {
      display: flex;
      justify-content: flex-end;
      padding: 15px;
      border-top: 1px solid #e0e0e0;
      margin-top: 15px;
    }

    .btn-delete {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      background-color: #ff5252;
      color: white;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: #d32f2f;
        transform: translateY(-2px);
      }
    }

    @media (max-width: 768px) {
      .container {
        margin: 10px;
        padding: 15px;
      }

      .detail-row {
        grid-template-columns: 1fr;
      }

      .purchase-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
      }
    }
  `]
})
export class PurchasesComponent implements OnInit {
  purchases: Purchase[] = [];
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadPurchases();
  }

  loadPurchases() {
    const purchaseRequests = JSON.parse(localStorage.getItem('purchaseRequests') || '[]');
    this.purchases = purchaseRequests.map((purchase: Omit<Purchase, 'date'> & { date: string }) => ({
      ...purchase,
      date: new Date(purchase.date)
    }));
  }

  get filteredPurchases() {
    return this.purchases.filter(purchase => 
      purchase.requestNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      purchase.details.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      this.getStatusLabel(purchase.status).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      default: return status;
    }
  }

  deletePurchase(purchase: Purchase) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.purchases = this.purchases.filter(p => p.requestNumber !== purchase.requestNumber);
      localStorage.setItem('purchaseRequests', JSON.stringify(this.purchases));
    }
  }
}
