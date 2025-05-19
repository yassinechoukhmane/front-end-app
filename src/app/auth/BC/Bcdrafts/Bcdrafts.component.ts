import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bcdrafts',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Brouillons des Bons de Commande</h2>
        <div class="search-section">
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            placeholder="Rechercher un brouillon..."
            class="search-input"
          >
          <i class="search-icon">🔍</i>
        </div>
      </div>

      <div class="drafts-list">
        <div *ngIf="drafts.length === 0" class="no-drafts">
          <i class="empty-icon">📋</i>
          <p>Aucun brouillon sauvegardé</p>
        </div>

        <div *ngFor="let draft of filteredDrafts" class="draft-item">
          <div class="draft-header">
            <div class="draft-title">
              <span class="draft-reference">Réf: {{ draft.reference }}</span>
              <span class="draft-date">{{ draft.date | date:'dd/MM/yyyy' }}</span>
            </div>
            <div class="draft-status">Brouillon</div>
          </div>
          
          <div class="draft-content">
            <div class="info-group">
              <div class="info-item">
                <label>Fournisseur ID:</label>
                <span>{{ draft.fournisseurId }}</span>
              </div>
              <div class="info-item">
                <label>Demande d'achat ID:</label>
                <span>{{ draft.demandeAchatId }}</span>
              </div>
            </div>
            
            <div class="info-group">
              <div class="info-item">
                <label>Projet ID:</label>
                <span>{{ draft.projetId }}</span>
              </div>
              <div class="info-item">
                <label>Montant Total:</label>
                <span class="montant">{{ draft.montantTotal }} DH</span>
              </div>
            </div>
          </div>

          <div class="draft-actions">
            <button class="btn btn-edit" (click)="editDraft(draft)">
              <i class="icon">✏️</i> Modifier
            </button>
            <button class="btn btn-delete" (click)="deleteDraft(draft.reference)">
              <i class="icon">🗑️</i> Supprimer
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="message" [class]="'alert ' + messageType">
        {{ message }}
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

    .drafts-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .draft-item {
      background: #ffffff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .draft-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .draft-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f2f5;
    }

    .draft-title {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .draft-reference {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }

    .draft-date {
      color: #7f8c8d;
      font-size: 14px;
    }

    .draft-status {
      background-color: #f1c40f;
      color: #fff;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    .draft-content {
      display: grid;
      gap: 20px;
      margin-bottom: 20px;
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

    .draft-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #f0f2f5;
    }

    .btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
    }

    .btn-edit {
      background-color: #3498db;
      color: white;
    }

    .btn-edit:hover {
      background-color: #2980b9;
    }

    .btn-delete {
      background-color: #e74c3c;
      color: white;
    }

    .btn-delete:hover {
      background-color: #c0392b;
    }

    .icon {
      font-size: 16px;
    }

    .no-drafts {
      text-align: center;
      padding: 40px;
      background: #f8f9fa;
      border-radius: 12px;
      border: 2px dashed #e9ecef;
    }

    .no-drafts .empty-icon {
      font-size: 48px;
      margin-bottom: 15px;
      display: block;
    }

    .no-drafts p {
      color: #95a5a6;
      font-size: 16px;
      font-weight: 500;
    }

    .alert {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      animation: slideIn 0.3s ease;
    }

    .alert.success {
      background-color: #27ae60;
    }

    .alert.error {
      background-color: #e74c3c;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .container {
        margin: 10px;
        padding: 15px;
      }

      .draft-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
      }

      .info-group {
        grid-template-columns: 1fr;
      }

      .draft-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class BcDraftsComponent implements OnInit {
  drafts: any[] = [];
  searchTerm: string = '';
  message: string = '';
  messageType: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadDrafts();
  }

  loadDrafts() {
    const savedDrafts = localStorage.getItem('bcDrafts');
    this.drafts = savedDrafts ? JSON.parse(savedDrafts) : [];
  }

  get filteredDrafts() {
    return this.drafts.filter(draft => 
      draft.reference?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      draft.fournisseurId?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      draft.demandeAchatId?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      draft.projetId?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editDraft(draft: any) {
    localStorage.setItem('currentBcDraft', JSON.stringify(draft));
    this.router.navigate(['/create-bc']);
  }

  deleteDraft(reference: string) {
    this.drafts = this.drafts.filter(draft => draft.reference !== reference);
    localStorage.setItem('bcDrafts', JSON.stringify(this.drafts));
    this.showMessage('Brouillon supprimé avec succès', 'success');
  }

  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}