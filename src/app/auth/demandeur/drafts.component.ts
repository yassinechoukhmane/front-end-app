import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drafts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="drafts-container">
      <h2>My Drafts</h2>
      <div *ngIf="message" class="alert-message">
  {{ message }}
    </div>
      <div *ngIf="drafts.length === 0" class="no-drafts">
        No drafts saved yet.
      </div>
      
      <div *ngFor="let draft of drafts" class="draft-item">
        <div class="draft-header">
          <span class="draft-number">{{ draft.requestNumber }}</span>
          <span class="draft-date">{{ draft.date | date:'dd/MM/yyyy' }}</span>
        </div>
        <div class="draft-details">
          <p><strong>Subject:</strong> {{ draft.subject }}</p>
          <p><strong>Category:</strong> {{ draft.category }}</p>
          <p><strong>Quantity:</strong> {{ draft.qte }}</p>
        </div>
        <div class="draft-actions">
          <button (click)="editDraft(draft)" class="btn btn-edit">Edit</button>
          <button (click)="deleteDraft(draft.requestNumber)" class="btn btn-delete">Delete</button>
          <button (click)="approveDraft(draft)" class="btn btn-approve">Approve</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .drafts-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    
    h2 {
      color: #2f3542;
      margin-bottom: 20px;
    }
    
    .no-drafts {
      padding: 20px;
      text-align: center;
      color: #57606f;
      background: #f8f9fa;
      border-radius: 4px;
    }
    
    .draft-item {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      padding: 15px;
      margin-bottom: 15px;
    }
    
    .draft-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f1f2f6;
    }
    
    .draft-number {
      font-weight: 500;
      color: #2f3542;
    }
    
    .draft-date {
      color: #57606f;
      font-size: 14px;
    }
    
    .draft-details p {
      margin-bottom: 5px;
      color: #57606f;
    }
    
    .draft-details strong {
      color: #2f3542;
    }
    
    .draft-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;
    }
    
    .btn {
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      font-size: 14px;
    }
    
    .btn-edit {
      background: #1e90ff;
      color: white;
    }
    
    .btn-edit:hover {
      background: #3742fa;
    }
    
    .btn-delete {
      background: #ff6b81;
      color: white;
    }
    
    .btn-delete:hover {
      background: #ff4757;
    }
    .alert-message {
  background-color: #dff9fb;
  color: #130f40;
  padding: 10px;
  border: 1px solid #c7ecee;
  border-radius: 5px;
  margin-bottom: 15px;
  font-weight: 500;
}

  `]
})
export class DraftsComponent implements OnInit {
  drafts: any[] = [];
  message: string = '';
  showMessage: boolean = false;

  ngOnInit() {
    this.loadDrafts();
  }

  loadDrafts() {
    const savedDrafts = localStorage.getItem('draftRequests');
    this.drafts = savedDrafts ? JSON.parse(savedDrafts) : [];
  }

  editDraft(draft: any) {
    localStorage.setItem('currentDraft', JSON.stringify(draft));
    // Rediriger vers une page d'édition
    window.location.href = '/demandeur';
  }
  

  deleteDraft(requestNumber: string) {
    this.drafts = this.drafts.filter(draft => draft.requestNumber !== requestNumber);
    localStorage.setItem('draftRequests', JSON.stringify(this.drafts));
    this.message = 'Brouillon supprimé avec succès.';
  }
  
  approveDraft(draft: any) {
    this.deleteDraft(draft.requestNumber);
  
    const completeRequest = {
      ...draft,
      status: 'submitted',
      date: new Date()
    };
  
    const submitted = localStorage.getItem('purchaseRequests');
    const submittedList = submitted ? JSON.parse(submitted) : [];
    submittedList.push(completeRequest);
    localStorage.setItem('purchaseRequests', JSON.stringify(submittedList));
  
    this.message = 'Brouillon approuvé et soumis avec succès.';
  }  
}