import { Component } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-purchase-order-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bc.component.html',
  styleUrls: ['./bc.component.scss'],
  providers: [DatePipe]
})
export class BcComponent {
  reference: string = '';
  status: string = '';
  fournisseurId: string = '';
  projetId: string = '';
  prixTotal: string = '';
  currentDate: string;
  demandeAchatId: string = '';
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  numeroBonCommande: string = '';

  constructor(private datePipe: DatePipe, private router: Router  ) {
    this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy') || '';
    const loadedDraft = localStorage.getItem('currentDraft');
if (loadedDraft) {
  const draft = JSON.parse(loadedDraft);
  this.reference = draft.reference;
  this.status = draft.status;
  this.fournisseurId = draft.fournisseurId;
  this.projetId = draft.projetId;
  this.prixTotal = draft.prixTotal;
  this.demandeAchatId = draft.demandeAchatId;
  localStorage.removeItem('currentDraft'); // Nettoyer après chargement
}

  }

  saveOrder() {
    console.log('Order saved:', {
      reference: this.reference,
      status: this.status,
      fournisseurId: this.fournisseurId,
      projetId: this.projetId,
      prixTotal: this.prixTotal,
      date: this.currentDate
    });
    this.message = 'Bon de commande enregistré avec succès !';
    this.messageType = 'success';
     setTimeout(() => {
      this.message = '';
    },     3000);

  }
  saveAsDraft() {
    const draft = {
      id: Date.now(), // identifiant unique
      reference: this.reference,
      status: this.status,
      fournisseurId: this.fournisseurId,
      projetId: this.projetId,
      prixTotal: this.prixTotal,
      demandeAchatId: this.demandeAchatId,
      date: this.currentDate
    };
  
    const drafts = JSON.parse(localStorage.getItem('drafts') || '[]');
    drafts.push(draft);
    localStorage.setItem('drafts', JSON.stringify(drafts));
  
    this.message = 'Brouillon enregistré avec succès !';
    this.messageType = 'success';
    setTimeout(() => (this.message = ''), 3000);
  }
  goToDrafts() {
    this.router.navigate(['/bcdrafts']);
  }
}
