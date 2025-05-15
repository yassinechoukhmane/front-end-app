import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fournisseur-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="sidebar">
        <h1>Target Metal Works</h1>
        
        <h2>Discover</h2>
        <ul>
          <li>
            <span class="nav-link home" (click)="goToHome()">
              Home
            </span>
          </li>
        </ul>
        
        <h2>Fournisseurs</h2>
        <ul>
          <li>
            <span class="nav-link add" (click)="goToAddFournisseur()">
              Add Fournisseur
            </span>
          </li>
        </ul>
        
        <div class="date">{{currentDate | date:'dd/MM/yyyy'}}</div>
      </div>

      <div class="main-content">
        <h1>LISTE DES FOURNISSEURS</h1>
        
        <div class="form-section">
          <div class="search-bar">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              placeholder="Rechercher un fournisseur..."
              (input)="filterFournisseurs()"
            >
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Adresse</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let fournisseur of filteredFournisseurs">
                <td>{{ fournisseur.name }}</td>
                <td>{{ fournisseur.phone }}</td>
                <td>{{ fournisseur.email }}</td>
                <td class="address-cell">{{ fournisseur.address }}</td>
                <td>{{ fournisseur.date | date:'dd/MM/yyyy' }}</td>
                <td class="actions">
                  <button class="action-btn edit" (click)="editFournisseur(fournisseur)">
                    Modifier
                  </button>
                  <button class="action-btn delete" (click)="deleteFournisseur(fournisseur)">
                    Supprimer
                  </button>
                </td>
              </tr>
              <tr *ngIf="filteredFournisseurs.length === 0">
                <td colspan="6" class="no-data">Aucun fournisseur trouvé</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      height: 100vh;
    }

    .sidebar {
      width: 250px;
      background: linear-gradient(180deg, #2c3e50, #34495e);
      padding: 20px;
      color: white;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

      h1 {
        margin-bottom: 30px;
        font-size: 24px;
        color: #ecf0f1;
        padding-bottom: 15px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      }

      h2 {
        margin-top: 25px;
        font-size: 16px;
        color: #3498db;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 15px 0;

        li {
          margin: 8px 0;

          .nav-link {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            color: #ecf0f1;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.3s ease;
            font-weight: 500;
            background: transparent;
            border: 1px solid transparent;

            &:hover {
              background: rgba(52, 152, 219, 0.1);
              border-color: rgba(52, 152, 219, 0.2);
              color: #3498db;
              transform: translateX(5px);
            }
          }
        }
      }

      .date {
        margin-top: 30px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        font-size: 14px;
        color: #ecf0f1;
        text-align: center;
      }
    }

    .main-content {
      flex: 1;
      padding: 20px;
      background-color: #ecf0f1;

      h1 {
        margin-bottom: 30px;
        color: #2c3e50;
      }
    }

    .form-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .search-bar {
      margin-bottom: 20px;

      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
        }
      }
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      th {
        background-color: #f8f9fa;
        color: #2c3e50;
        font-weight: 500;
      }

      .address-cell {
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .actions {
        display: flex;
        gap: 8px;
      }

      .action-btn {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;

        &.edit {
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: white;

          &:hover {
            background: linear-gradient(135deg, #2980b9, #2472a4);
          }
        }

        &.delete {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;

          &:hover {
            background: linear-gradient(135deg, #c0392b, #a93226);
          }
        }
      }
    }

    .no-data {
      text-align: center;
      color: #7f8c8d;
      font-style: italic;
      padding: 20px;
    }
  `]
})
export class FournisseurListComponent implements OnInit {
  currentDate = new Date();
  fournisseurs: any[] = [];
  filteredFournisseurs: any[] = [];
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    const savedFournisseurs = localStorage.getItem('fournisseurs');
    if (savedFournisseurs) {
      this.fournisseurs = JSON.parse(savedFournisseurs);
      this.filteredFournisseurs = [...this.fournisseurs];
    }
  }

  filterFournisseurs() {
    if (!this.searchTerm) {
      this.filteredFournisseurs = [...this.fournisseurs];
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredFournisseurs = this.fournisseurs.filter(fournisseur => 
      fournisseur.name.toLowerCase().includes(search) ||
      fournisseur.phone.includes(search) ||
      fournisseur.email.toLowerCase().includes(search) ||
      fournisseur.address.toLowerCase().includes(search)
    );
  }

  editFournisseur(fournisseur: any) {
    localStorage.setItem('editingFournisseur', JSON.stringify(fournisseur));
    this.router.navigate(['/add-fournisseur']);
  }

  deleteFournisseur(fournisseur: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.fournisseurs = this.fournisseurs.filter(f => f.phone !== fournisseur.phone);
      localStorage.setItem('fournisseurs', JSON.stringify(this.fournisseurs));
      this.filterFournisseurs();
    }
  }

  goToHome() {
    this.router.navigate(['/responsable']);
  }

  goToAddFournisseur() {
    this.router.navigate(['/add-fournisseur']);
  }
} 