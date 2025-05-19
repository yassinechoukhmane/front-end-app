import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-projet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="sidebar">
        <h1>Target Metal Works</h1>
        
        <h2>Découvrir</h2>
        <ul>
          <li>
            <span class="nav-link home" (click)="goToHome()">
              Accueil
            </span>
          </li>
        </ul>
        
        <h2>Demandes</h2>
        <ul>
          <li>
            <span class="nav-link all" (click)="goToList()">
              Toutes les Demandes
            </span>
          </li>
          <li>
            <span class="nav-link drafts" (click)="goToDrafts()">
              Brouillons
            </span>
          </li>
        </ul>
        
        <div class="date">{{currentDate | date:'dd/MM/yyyy'}}</div>
        <div class="welcome">Bienvenue M / Mme</div>
      </div>
      
      <div class="main-content">
        <h1>CRÉATION DEMANDE DE PROJET</h1>
        
        <div class="form-section">
          <table class="form-table">
            <tr>
              <th>Nom du Projet</th>
              <th>Date</th>
            </tr>
            <tr>
              <td>
                <input 
                  type="text" 
                  [(ngModel)]="demande.name" 
                  placeholder="Entrez le nom du projet"
                />
              </td>
              <td>{{ currentDate | date:'dd/MM/yyyy' }}</td>
            </tr>
          </table>
          
          <table class="data-table">
            <tr>
              <th>ID Demande d'achat</th>
              <th>ID Projet</th>
            </tr>
            <tr>
              <td>
                <input 
                  type="text" 
                  [(ngModel)]="demande.demandeAchatId" 
                  placeholder="Entrez l'ID de la demande d'achat"
                />
              </td>
              <td>
                <input 
                  type="text" 
                  [(ngModel)]="demande.projetId" 
                  placeholder="Entrez l'ID du projet"
                />
              </td>
            </tr>
          </table>

          <table class="data-table">
            <tr>
              <th>Description</th>
            </tr>
            <tr>
              <td>
                <textarea 
                  [(ngModel)]="demande.description" 
                  placeholder="Entrez la description détaillée du projet"
                  rows="4"
                ></textarea>
              </td>
            </tr>
          </table>

          <div class="button-group">
            <button class="save-btn draft" (click)="saveAsDraft()">
              ENREGISTRER COMME BROUILLON
            </button>
            <button class="save-btn final" (click)="saveDemande()">
              ENREGISTRER
            </button>
          </div>
          
          <div *ngIf="message" [ngClass]="['message-box', messageType]">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./demande-projet.component.scss']
})
export class DemandeProjetComponent {
  currentDate = new Date();
  message: string = '';
  messageType: string = '';

  demande = {
    name: '',
    demandeAchatId: '',
    projetId: '',
    description: '',
    date: new Date(),
    status: 'issued'
  };

  constructor(private router: Router) {}

  saveDemande() {
    if (!this.validateForm()) {
      this.showMessage('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    const demandes = JSON.parse(localStorage.getItem('demandes_projet') || '[]');
    demandes.push({
      ...this.demande,
      date: new Date(),
      status: 'issued'
    });
    
    localStorage.setItem('demandes_projet', JSON.stringify(demandes));
    this.showMessage('La demande a été enregistrée avec succès', 'success');
    this.resetForm();
  }

  saveAsDraft() {
    const drafts = JSON.parse(localStorage.getItem('demandes_projet_drafts') || '[]');
    drafts.push({
      ...this.demande,
      date: new Date(),
      status: 'draft'
    });
    
    localStorage.setItem('demandes_projet_drafts', JSON.stringify(drafts));
    this.showMessage('Le brouillon a été enregistré avec succès', 'success');
    this.resetForm();
  }

  validateForm(): boolean {
    return Boolean(this.demande.name) &&
           Boolean(this.demande.demandeAchatId) &&
           Boolean(this.demande.projetId) &&
           Boolean(this.demande.description);
  }

  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  resetForm() {
    this.demande = {
      name: '',
      demandeAchatId: '',
      projetId: '',
      description: '',
      date: new Date(),
      status: 'issued'
    };
  }

  goToHome() {
    this.router.navigate(['/responsable']);
  }

  goToList() {
    this.router.navigate(['/demande-projet-list']);
  }

  goToDrafts() {
    this.router.navigate(['/demande-projet-drafts']);
  }
} 