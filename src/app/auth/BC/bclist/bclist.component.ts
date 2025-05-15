import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bclist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Liste des Bons de Commande</h2>
        <div class="search-section">
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            placeholder="Rechercher un bon de commande..."
            class="search-input"
          >
          <i class="search-icon">🔍</i>
        </div>
      </div>

      <div class="bc-list">
        <div *ngIf="bcs.length === 0" class="no-bcs">
          <i class="empty-icon">📄</i>
          <p>Aucun bon de commande enregistré</p>
        </div>

        <div *ngFor="let bc of filteredBCs" class="bc-item">
          <div class="bc-header">
            <div class="bc-title">
              <span class="bc-reference">Réf: {{ bc.reference }}</span>
              <span class="bc-date">{{ bc.date | date:'dd/MM/yyyy' }}</span>
            </div>
          </div>
          
          <div class="bc-content">
            <div class="info-group">
              <div class="info-item">
                <label>Fournisseur ID:</label>
                <span>{{ bc.fournisseurId }}</span>
              </div>
              <div class="info-item">
                <label>Demande d'achat ID:</label>
                <span>{{ bc.demandeAchatId }}</span>
              </div>
            </div>
            
            <div class="info-group">
              <div class="info-item">
                <label>Projet ID:</label>
                <span>{{ bc.projetId }}</span>
              </div>
              <div class="info-item">
                <label>Montant Total:</label>
                <span class="montant">{{ bc.montantTotal }} DH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 25px;
      background-color: #ffffff;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header {
      margin-bottom: 30px;
    }

    h2 {
      color: #2c3e50;
      font-size: 28px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 25px;
      position: relative;
      padding-bottom: 15px;
    }

    h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 3px;
      background: linear-gradient(to right, #3498db, #2980b9);
      border-radius: 3px;
    }

    .search-section {
      position: relative;
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      padding: 15px 45px 15px 20px;
      border: 2px solid #e9ecef;
      border-radius: 10px;
      font-size: 16px;
      transition: all 0.3s ease;
      background-color: #f8f9fa;
    }

    .search-input:focus {
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
      outline: none;
    }

    .search-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #95a5a6;
      font-size: 18px;
    }

    .bc-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .bc-item {
      background: #ffffff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .bc-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .bc-header {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f2f5;
    }

    .bc-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .bc-reference {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }

    .bc-date {
      color: #7f8c8d;
      font-size: 14px;
      font-weight: 500;
    }

    .bc-content {
      display: grid;
      gap: 20px;
    }

    .info-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .info-item label {
      font-size: 14px;
      color: #7f8c8d;
      font-weight: 500;
    }

    .info-item span {
      font-size: 16px;
      color: #2c3e50;
      font-weight: 500;
    }

    .montant {
      color: #27ae60 !important;
      font-weight: 600 !important;
    }

    .no-bcs {
      text-align: center;
      padding: 40px;
      background: #f8f9fa;
      border-radius: 12px;
      border: 2px dashed #e9ecef;
    }

    .no-bcs .empty-icon {
      font-size: 48px;
      margin-bottom: 15px;
      display: block;
    }

    .no-bcs p {
      color: #95a5a6;
      font-size: 16px;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .container {
        margin: 10px;
        padding: 15px;
      }

      .bc-title {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
      }

      .info-group {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BcListComponent implements OnInit {
  bcs: any[] = [];
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadBCs();
  }

  loadBCs() {
    const savedBCs = localStorage.getItem('bons_commande');
    this.bcs = savedBCs ? JSON.parse(savedBCs) : [];
  }

  get filteredBCs() {
    return this.bcs.filter(bc => 
      bc.reference?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bc.fournisseurId?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bc.demandeAchatId?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bc.projetId?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
