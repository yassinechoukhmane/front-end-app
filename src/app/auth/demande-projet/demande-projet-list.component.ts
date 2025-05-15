import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demande-projet-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <h2>Liste des Demandes de Projet</h2>
      
      <div class="search-section">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          placeholder="Rechercher une demande..."
          class="search-input"
        >
      </div>

      <div class="demandes-list">
        <div *ngIf="demandes.length === 0" class="no-demandes">
          Aucune demande de projet enregistrée.
        </div>

        <div *ngFor="let demande of filteredDemandes" class="demande-item">
          <div class="demande-header">
            <span class="demande-name">{{ demande.name }}</span>
            <span class="demande-date">{{ demande.date | date:'dd/MM/yyyy' }}</span>
          </div>
          <div class="demande-details">
            <p><strong>Demande d'achat ID:</strong> {{ demande.demandeAchatId }}</p>
            <p><strong>Projet ID:</strong> {{ demande.projetId }}</p>
            <p><strong>Description:</strong> {{ demande.description }}</p>
            <p><strong>Status:</strong> {{ demande.status }}</p>
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
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h2 {
      color: #2c3e50;
      margin-bottom: 30px;
      text-align: center;
      font-size: 24px;
    }

    .search-section {
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    .search-input:focus {
      border-color: #409eff;
      outline: none;
    }

    .demande-item {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      transition: transform 0.2s;
    }

    .demande-item:hover {
      transform: translateY(-2px);
    }

    .demande-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e9ecef;
    }

    .demande-name {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }

    .demande-date {
      color: #606f7b;
      font-size: 14px;
    }

    .demande-details {
      margin-bottom: 15px;
    }

    .demande-details p {
      margin: 8px 0;
      color: #4a5568;
    }

    .demande-details strong {
      color: #2d3748;
    }

    .no-demandes {
      text-align: center;
      padding: 20px;
      color: #6c757d;
      font-style: italic;
      background: #f8f9fa;
      border-radius: 8px;
      margin-top: 20px;
    }
  `]
})
export class DemandeProjetListComponent implements OnInit {
  demandes: any[] = [];
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadDemandes();
  }

  loadDemandes() {
    const savedDemandes = localStorage.getItem('demandes_projet');
    this.demandes = savedDemandes ? JSON.parse(savedDemandes) : [];
  }

  get filteredDemandes() {
    return this.demandes.filter(demande => 
      demande.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      demande.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      demande.demandeAchatId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      demande.projetId.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
} 