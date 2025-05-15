import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-projet-drafts',
  standalone: true,
  imports: [CommonModule],
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
        
        <h2>Demandes</h2>
        <ul>
          <li>
            <span class="nav-link create" (click)="goToCreate()">
              Create Demande
            </span>
          </li>
        </ul>
        
        <div class="date">{{currentDate | date:'dd/MM/yyyy'}}</div>
      </div>

      <div class="main-content">
        <h1>BROUILLONS DES DEMANDES DE PROJET</h1>
        
        <div class="form-section">
          <div *ngIf="drafts.length === 0" class="no-drafts">
            Aucun brouillon sauvegardé.
          </div>

          <div *ngFor="let draft of drafts" class="draft-card">
            <div class="draft-header">
              <span class="draft-name">{{ draft.name }}</span>
              <span class="draft-date">{{ draft.date | date:'dd/MM/yyyy' }}</span>
            </div>
            
            <div class="draft-content">
              <div class="draft-detail">
                <strong>Demande d'achat ID:</strong> {{ draft.demandeAchatId }}
              </div>
              <div class="draft-detail">
                <strong>Projet ID:</strong> {{ draft.projetId }}
              </div>
              <div class="draft-detail">
                <strong>Description:</strong>
                <p class="description">{{ draft.description }}</p>
              </div>
            </div>

            <div class="draft-actions">
              <button class="action-btn edit" (click)="editDraft(draft)">
                Modifier
              </button>
              <button class="action-btn delete" (click)="deleteDraft(draft)">
                Supprimer
              </button>
              <button class="action-btn submit" (click)="submitDraft(draft)">
                Soumettre
              </button>
            </div>
          </div>
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

    .no-drafts {
      text-align: center;
      padding: 40px;
      color: #7f8c8d;
      font-style: italic;
    }

    .draft-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);

      .draft-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #dee2e6;

        .draft-name {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
        }

        .draft-date {
          color: #7f8c8d;
          font-size: 14px;
        }
      }

      .draft-content {
        margin-bottom: 20px;

        .draft-detail {
          margin-bottom: 10px;

          strong {
            color: #34495e;
            margin-right: 8px;
          }

          .description {
            margin-top: 5px;
            color: #2c3e50;
            line-height: 1.5;
          }
        }
      }

      .draft-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;

        .action-btn {
          padding: 8px 16px;
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

          &.submit {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;

            &:hover {
              background: linear-gradient(135deg, #27ae60, #219a52);
            }
          }

          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        }
      }
    }
  `]
})
export class DemandeProjetDraftsComponent implements OnInit {
  currentDate = new Date();
  drafts: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadDrafts();
  }

  loadDrafts() {
    const savedDrafts = localStorage.getItem('demandes_projet_drafts');
    this.drafts = savedDrafts ? JSON.parse(savedDrafts) : [];
  }

  editDraft(draft: any) {
    localStorage.setItem('editing_demande_projet', JSON.stringify(draft));
    this.router.navigate(['/create-demande-projet']);
  }

  deleteDraft(draft: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce brouillon ?')) {
      this.drafts = this.drafts.filter(d => d.name !== draft.name);
      localStorage.setItem('demandes_projet_drafts', JSON.stringify(this.drafts));
    }
  }

  submitDraft(draft: any) {
    const demandes = JSON.parse(localStorage.getItem('demandes_projet') || '[]');
    demandes.push({
      ...draft,
      status: 'submitted',
      date: new Date()
    });
    
    localStorage.setItem('demandes_projet', JSON.stringify(demandes));
    this.deleteDraft(draft);
    alert('Demande soumise avec succès !');
  }

  goToHome() {
    this.router.navigate(['/responsable']);
  }

  goToCreate() {
    this.router.navigate(['/create-demande-projet']);
  }
} 