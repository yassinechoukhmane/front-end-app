import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Fournisseur {
  name: string;
  phone: string;
  email: string;
  address: string;
  date: string;
}

@Component({
  selector: 'app-director-suppliers',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <header class="page-header">
        <h1>Fournisseurs</h1>
        <div class="header-actions">
          <div class="search-box">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              (input)="filterFournisseurs()"
              placeholder="Rechercher un fournisseur..."
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
          <h3>{{totalFournisseurs}}</h3>
          <p>Total Fournisseurs</p>
        </div>
      </div>

      <div class="fournisseurs-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Adresse</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let fournisseur of filteredFournisseurs">
              <td>{{fournisseur.name}}</td>
              <td>{{fournisseur.phone}}</td>
              <td>{{fournisseur.email}}</td>
              <td>{{fournisseur.address}}</td>
              <td>{{fournisseur.date | date:'dd/MM/yyyy'}}</td>
            </tr>
            <tr *ngIf="filteredFournisseurs.length === 0">
              <td colspan="5" class="no-data">Aucun fournisseur trouvé</td>
            </tr>
          </tbody>
        </table>
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

    h1 {
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
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

    .fournisseurs-table {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
    }

    th {
      background: #f8f9fa;
      color: #2c3e50;
      font-weight: 600;
    }

    td {
      color: #2c3e50;
    }

    .no-data {
      text-align: center;
      color: #7f8c8d;
      padding: 2rem;
      font-style: italic;
    }
  `]
})
export class DirectorSuppliersComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  filteredFournisseurs: Fournisseur[] = [];
  searchTerm: string = '';
  totalFournisseurs: number = 0;

  constructor() {}

  ngOnInit() {
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    const savedFournisseurs = localStorage.getItem('fournisseurs');
    if (savedFournisseurs) {
      this.fournisseurs = JSON.parse(savedFournisseurs);
      this.filteredFournisseurs = [...this.fournisseurs];
      this.totalFournisseurs = this.fournisseurs.length;
    }
  }

  filterFournisseurs() {
    if (!this.searchTerm.trim()) {
      this.filteredFournisseurs = [...this.fournisseurs];
    } else {
      const search = this.searchTerm.toLowerCase();
      this.filteredFournisseurs = this.fournisseurs.filter(fournisseur =>
        fournisseur.name.toLowerCase().includes(search) ||
        fournisseur.phone.includes(search) ||
        fournisseur.email.toLowerCase().includes(search) ||
        fournisseur.address.toLowerCase().includes(search)
      );
    }
  }
} 