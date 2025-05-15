import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-drafts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Mes Brouillons</h2>
      </div>

      <div class="drafts-container">
        <div *ngIf="drafts.length === 0" class="no-drafts">
          Aucun brouillon sauvegardé.
        </div>

        <div *ngFor="let draft of drafts" class="draft-card">
          <div class="draft-header">
            <span class="draft-number">Request #{{ draft.requestNumber }}</span>
            <span class="draft-date">{{ draft.date | date:'dd/MM/yyyy' }}</span>
          </div>
          
          <div class="draft-content">
            <div class="draft-detail">
              <strong>Quantité:</strong> {{ draft.qte }}
            </div>
            <div class="draft-detail">
              <strong>Description:</strong>
              <p class="description">{{ draft.details }}</p>
            </div>
          </div>

          <div class="draft-actions">
            <button class="btn btn-edit" (click)="editDraft(draft)">
              Modifier
            </button>
            <button class="btn btn-delete" (click)="deleteDraft(draft.requestNumber)">
              Supprimer
            </button>
            <button class="btn btn-submit" (click)="submitDraft(draft)">
              Soumettre
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      margin-bottom: 30px;
    }

    h2 {
      color: #2c3e50;
      font-size: 24px;
    }

    .no-drafts {
      text-align: center;
      padding: 40px;
      background: #f8f9fa;
      border-radius: 8px;
      color: #6c757d;
      font-size: 16px;
    }

    .draft-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
      margin-bottom: 20px;
    }

    .draft-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }

    .draft-number {
      font-weight: 600;
      color: #2c3e50;
      font-size: 16px;
    }

    .draft-date {
      color: #6c757d;
      font-size: 14px;
    }

    .draft-content {
      margin-bottom: 20px;
    }

    .draft-detail {
      margin-bottom: 10px;
    }

    .draft-detail strong {
      color: #2c3e50;
      display: inline-block;
      width: 100px;
    }

    .description {
      margin-top: 5px;
      color: #4a5568;
      line-height: 1.5;
      white-space: pre-wrap;
    }

    .draft-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
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

    .btn-submit {
      background-color: #2ecc71;
      color: white;
    }

    .btn-submit:hover {
      background-color: #27ae60;
    }
  `]
})
export class DraftsComponent implements OnInit {
  drafts: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadDrafts();
  }

  loadDrafts() {
    const savedDrafts = localStorage.getItem('draftRequests');
    this.drafts = savedDrafts ? JSON.parse(savedDrafts) : [];
  }

  editDraft(draft: any) {
    // Stocker le brouillon à éditer
    localStorage.setItem('currentDraft', JSON.stringify(draft));
    // Rediriger vers la page de création
    this.router.navigate(['/demandeur']);
  }

  deleteDraft(requestNumber: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce brouillon ?')) {
      this.drafts = this.drafts.filter(draft => draft.requestNumber !== requestNumber);
      localStorage.setItem('draftRequests', JSON.stringify(this.drafts));
    }
  }

  submitDraft(draft: any) {
    // Supprimer des brouillons
    this.deleteDraft(draft.requestNumber);

    // Préparer la requête finale
    const completeRequest = {
      ...draft,
      status: 'pending',
      date: new Date()
    };

    // Ajouter aux requêtes soumises
    const submittedRequests = JSON.parse(localStorage.getItem('purchaseRequests') || '[]');
    submittedRequests.push(completeRequest);
    localStorage.setItem('purchaseRequests', JSON.stringify(submittedRequests));

    alert('Requête soumise avec succès !');
  }
}