// src/app/auth/fournisseur/fournisseur-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Fournisseur {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-fournisseur-list',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  template: `
    <div class="fournisseur-page">
      <div class="header-section">
        <h1>Liste des Fournisseurs</h1>
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-value">{{ fournisseurs.length }}</div>
            <div class="stat-label">Total Fournisseurs</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ getActiveFournisseurs() }}</div>
            <div class="stat-label">Fournisseurs Actifs</div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <div class="filters">
          <input 
            type="text" 
            placeholder="Rechercher un fournisseur..." 
            class="search-input"
            [(ngModel)]="searchTerm"
            (input)="filterFournisseurs()"
          >
          <select 
            class="filter-select"
            [(ngModel)]="statusFilter"
            (change)="filterFournisseurs()"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>

        <div *ngIf="filteredFournisseurs.length === 0" class="no-fournisseurs">
          <div class="empty-state">
            <span class="empty-icon">📋</span>
            <p>Aucun fournisseur trouvé</p>
          </div>
        </div>

        <div class="fournisseurs-grid">
          <div *ngFor="let fournisseur of filteredFournisseurs" class="fournisseur-card">
            <div class="fournisseur-header">
              <h3>{{ fournisseur.name }}</h3>
              <span class="status-badge" [class.active]="fournisseur.status === 'active'">
                {{ fournisseur.status === 'active' ? 'Actif' : 'Inactif' }}
              </span>
            </div>
            
            <div class="fournisseur-details">
              <div class="detail-item">
                <span class="icon">📧</span>
                <span>{{ fournisseur.email }}</span>
              </div>
              <div class="detail-item">
                <span class="icon">📱</span>
                <span>{{ fournisseur.phone }}</span>
              </div>
              <div class="detail-item">
                <span class="icon">📍</span>
                <span>{{ fournisseur.address }}</span>
              </div>
              <div class="detail-item">
                <span class="icon">🏷️</span>
                <span>{{ fournisseur.category }}</span>
              </div>
            </div>

            <div class="fournisseur-actions">
              <button class="action-btn edit" (click)="editFournisseur(fournisseur)">
                <span class="icon">✏️</span> Modifier
              </button>
              <button class="action-btn delete" (click)="deleteFournisseur(fournisseur.id)">
                <span class="icon">🗑️</span> Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fournisseur-page {
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

    .fournisseurs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .fournisseur-card {
      background: white;
      border-radius: 12px;
      border: 1px solid #dfe6e9;
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transform: translateY(-5px);
      }
    }

    .fournisseur-header {
      padding: 1.5rem;
      background: #f8f9fa;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        margin: 0;
        color: #2d3436;
        font-size: 1.1rem;
      }
    }

    .status-badge {
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;

      &.active {
        background: #d4edda;
        color: #155724;
      }

      &:not(.active) {
        background: #f8d7da;
        color: #721c24;
      }
    }

    .fournisseur-details {
      padding: 1.5rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 0.8rem;
      color: #636e72;

      .icon {
        font-size: 1.2rem;
      }
    }

    .fournisseur-actions {
      padding: 1rem;
      background: #f8f9fa;
      display: flex;
      gap: 1rem;
      border-top: 1px solid #dfe6e9;
    }

    .action-btn {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;

      &.edit {
        background: #74b9ff;
        color: white;

        &:hover {
          background: #0984e3;
        }
      }

      &.delete {
        background: #ff7675;
        color: white;

        &:hover {
          background: #d63031;
        }
      }
    }

    .no-fournisseurs {
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

    @media (max-width: 768px) {
      .fournisseur-page {
        padding: 1rem;
      }

      .filters {
        flex-direction: column;
      }

      .fournisseurs-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FournisseurListComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  filteredFournisseurs: Fournisseur[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';

  ngOnInit() {
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    const savedFournisseurs = localStorage.getItem('fournisseurs');
    this.fournisseurs = savedFournisseurs ? JSON.parse(savedFournisseurs) : [];
    this.filteredFournisseurs = this.fournisseurs;
  }

  getActiveFournisseurs() {
    return this.fournisseurs.filter(f => f.status === 'active').length;
  }

  filterFournisseurs() {
    this.filteredFournisseurs = this.fournisseurs.filter(fournisseur => {
      const matchesSearch = this.searchTerm ? 
        fournisseur.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        fournisseur.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesStatus = this.statusFilter === 'all' ? 
        true : 
        fournisseur.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  editFournisseur(fournisseur: Fournisseur) {
    // Implémenter la logique d'édition
    console.log('Édition du fournisseur:', fournisseur);
  }

  deleteFournisseur(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.fournisseurs = this.fournisseurs.filter(f => f.id !== id);
      localStorage.setItem('fournisseurs', JSON.stringify(this.fournisseurs));
      this.filterFournisseurs();
    }
  }
}