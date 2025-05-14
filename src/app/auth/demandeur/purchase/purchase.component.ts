import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="purchases-container">
      <h2>All Purchases</h2>
      <div *ngIf="purchases.length === 0" class="no-purchases">
        No purchases found.
      </div>
      
      <div *ngFor="let purchase of purchases" class="purchase-item">
        <div class="purchase-header">
          <span class="purchase-number">{{ purchase.requestNumber }}</span>
          <span class="purchase-date">{{ purchase.date | date:'dd/MM/yyyy' }}</span>
        </div>
        <div class="purchase-details">
          <p><strong>Subject:</strong> {{ purchase.subject }}</p>
          <p><strong>Category:</strong> {{ purchase.category }}</p>
          <p><strong>Quantity:</strong> {{ purchase.qte }}</p>
          <p><strong>Status:</strong> {{ purchase.status }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .purchases-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    
    .no-purchases {
      padding: 20px;
      text-align: center;
      color: #57606f;
      background: #f8f9fa;
      border-radius: 4px;
    }
    
    .purchase-item {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      padding: 15px;
      margin-bottom: 15px;
    }
    
    .purchase-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f1f2f6;
    }
    
    .purchase-number {
      font-weight: 500;
      color: #2f3542;
    }
    
    .purchase-date {
      color: #57606f;
      font-size: 14px;
    }
    
    .purchase-details p {
      margin-bottom: 5px;
      color: #57606f;
    }
    
    .purchase-details strong {
      color: #2f3542;
    }
  `]
})
export class PurchasesComponent implements OnInit {
  purchases: any[] = [];

  ngOnInit() {
    this.loadPurchases();
  }

  loadPurchases() {
    const savedPurchases = localStorage.getItem('purchaseRequests');
    this.purchases = savedPurchases ? JSON.parse(savedPurchases) : [];
  }
}
