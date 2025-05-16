import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bc.component.html',
  styleUrls: ['./bc.component.scss']
})
export class BcComponent implements OnInit {
  currentDate = new Date();
  reference: string = '';
  fournisseurId: string = '';
  demandeAchatId: string = '';
  projetId: string = '';
  montantTotal: number = 0;
  message: string = '';
  messageType: string = '';
  activeTab: string = 'home';

  constructor(private router: Router) {}

  ngOnInit() {
    // Vérifier s'il y a un brouillon en cours d'édition
    const currentDraft = localStorage.getItem('currentBcDraft');
    if (currentDraft) {
      const draft = JSON.parse(currentDraft);
      this.reference = draft.reference;
      this.fournisseurId = draft.fournisseurId;
      this.demandeAchatId = draft.demandeAchatId;
      this.projetId = draft.projetId;
      this.montantTotal = draft.montantTotal;
      // Supprimer le brouillon en cours d'édition
      localStorage.removeItem('currentBcDraft');
    }
  }

  saveAsDraft() {
    const draft = {
      reference: this.reference,
      date: this.currentDate,
      fournisseurId: this.fournisseurId,
      demandeAchatId: this.demandeAchatId,
      projetId: this.projetId,
      montantTotal: this.montantTotal,
      status: 'draft'
    };

    const drafts = JSON.parse(localStorage.getItem('bcDrafts') || '[]');
    drafts.push(draft);
    localStorage.setItem('bcDrafts', JSON.stringify(drafts));

    this.message = 'Brouillon enregistré avec succès';
    this.messageType = 'success';
    this.resetForm();
  }

  saveOrder() {
    if (!this.validateForm()) {
      this.message = 'Veuillez remplir tous les champs';
      this.messageType = 'error';
      return;
    }

    const order = {
      reference: this.reference,
      date: this.currentDate,
      fournisseurId: this.fournisseurId,
      demandeAchatId: this.demandeAchatId,
      projetId: this.projetId,
      montantTotal: this.montantTotal,
      status: 'submitted'
    };

    const orders = JSON.parse(localStorage.getItem('bons_commande') || '[]');
    orders.push(order);
    localStorage.setItem('bons_commande', JSON.stringify(orders));

    this.message = 'Bon de commande enregistré avec succès';
    this.messageType = 'success';
    this.resetForm();
  }

  validateMontant(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = parseFloat(input.value);
    
    // Empêcher les nombres négatifs
    if (value < 0) {
      value = 0;
      input.value = '0';
    }
    
    this.montantTotal = value;
  }

  validateForm(): boolean {
    return Boolean(this.reference) && 
           Boolean(this.fournisseurId) && 
           Boolean(this.demandeAchatId) && 
           Boolean(this.projetId) && 
           this.montantTotal > 0;
  }

  resetForm() {
    this.reference = '';
    this.fournisseurId = '';
    this.demandeAchatId = '';
    this.projetId = '';
    this.montantTotal = 0;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goToHome() {
    this.setActiveTab('home');
    this.router.navigate(['/responsable']);
  }

  goToList() {
    this.setActiveTab('all');
    this.router.navigate(['/bclist']);
  }

  goToDrafts() {
    this.setActiveTab('drafts');
    this.router.navigate(['/bcdrafts']);
  }
}
