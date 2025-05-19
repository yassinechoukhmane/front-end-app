import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BCStatus } from '../bc.models';

@Component({
  selector: 'app-bclist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bc-list-container">
      <h1>Liste des Bons de Commande</h1>
      
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="Rechercher un bon de commande..." 
          class="search-input"
        >
        <span class="search-icon">🔍</span>
      </div>

      <div class="bc-cards">
        <div class="bc-card" *ngFor="let bc of bons_commande">
          <div class="bc-header">
            <div class="bc-ref">Réf: {{ bc.reference }}</div>
            <div class="bc-date">{{ bc.date | date:'dd/MM/yyyy' }}</div>
          </div>

          <div class="bc-body">
            <div class="bc-info">
              <div class="info-group">
                <label>Fournisseur ID:</label>
                <span>{{ bc.fournisseurId }}</span>
              </div>
              
              <div class="info-group">
                <label>Demande d'achat ID:</label>
                <span>{{ bc.demandeAchatId }}</span>
              </div>

              <div class="info-group">
                <label>Projet ID:</label>
                <span>{{ bc.projetId }}</span>
              </div>

              <div class="info-group">
                <label>Montant Total:</label>
                <span class="montant">{{ bc.montantTotal }} DH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="bons_commande.length === 0" class="no-data">
        Aucun bon de commande disponible
      </div>
    </div>
  `,
  styles: [`
    .bc-list-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 30px;
      font-size: 28px;
      position: relative;
    }

    h1:after {
      content: '';
      display: block;
      width: 100px;
      height: 3px;
      background: #3498db;
      margin: 10px auto;
    }

    .search-bar {
      position: relative;
      margin-bottom: 30px;
    }

    .search-input {
      width: 100%;
      padding: 12px 20px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 25px;
      outline: none;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }

    .search-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }

    .bc-cards {
      display: grid;
      gap: 20px;
    }

    .bc-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .bc-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .bc-header {
      padding: 15px 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .bc-ref {
      font-weight: 600;
      color: #2c3e50;
    }

    .bc-date {
      color: #7f8c8d;
      font-size: 14px;
    }

    .bc-body {
      padding: 20px;
    }

    .info-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
    }

    .info-group label {
      color: #7f8c8d;
      font-size: 14px;
    }

    .info-group span {
      font-weight: 500;
      color: #2c3e50;
    }

    .montant {
      color: #27ae60 !important;
      font-weight: 600 !important;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status-issued {
      background-color: rgba(52, 152, 219, 0.1);
      color: #3498db;
    }

    .status-received {
      background-color: rgba(46, 204, 113, 0.1);
      color: #2ecc71;
    }

    .status-cancelled {
      background-color: rgba(231, 76, 60, 0.1);
      color: #e74c3c;
    }

    .bc-actions {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }

    .btn-update {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      background-color: #3498db;
      color: white;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .btn-update:hover {
      background-color: #2980b9;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #7f8c8d;
      font-style: italic;
      background: white;
      border-radius: 10px;
      margin-top: 20px;
    }
  `]
})
export class BcListComponent implements OnInit {
  bons_commande: any[] = [];

  ngOnInit() {
    const stored = localStorage.getItem('bons_commande');
    if (stored) {
      this.bons_commande = JSON.parse(stored);
      console.log('Bons de commande chargés:', this.bons_commande);
    }
  }

  updateStatus(bc: any) {
    const statuses = ['issued', 'received', 'cancelled'];
    const currentStatus = bc.status || 'issued';
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    bc.status = statuses[nextIndex];
    
    localStorage.setItem('bons_commande', JSON.stringify(this.bons_commande));
  }
}
