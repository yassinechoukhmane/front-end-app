import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface Draft {
  id?: number;
  requestNumber: string;
  subject: string;
  category: string;
  qte: number;
  date: Date;
  status: string;
  reference?: string;
  fournisseurId?: string;
  projetId?: string;
  prixTotal?: string;
  demandeAchatId?: string;
}

@Component({
  selector: 'app-drafts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './Bcdrafts.component.html',
  styleUrls: ['./Bcdrafts.component.scss']
})
export class BcDraftsComponent implements OnInit {
  drafts: Draft[] = [];
  message: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadDrafts();
  }

  loadDrafts() {
    const savedDrafts = localStorage.getItem('drafts');
    this.drafts = savedDrafts ? JSON.parse(savedDrafts) : [];
  }

  editDraft(draft: Draft) {
    localStorage.setItem('currentDraft', JSON.stringify(draft));
    this.router.navigate(['/create-bc']);
  }

  deleteDraft(requestNumber: string) {
    this.drafts = this.drafts.filter(draft => draft.requestNumber !== requestNumber);
    localStorage.setItem('drafts', JSON.stringify(this.drafts));
    this.showTemporaryMessage('Brouillon supprimé avec succès.');
  }

  approveDraft(draft: Draft) {
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

    this.showTemporaryMessage('Brouillon approuvé et soumis avec succès.');
  }

  private showTemporaryMessage(msg: string) {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}