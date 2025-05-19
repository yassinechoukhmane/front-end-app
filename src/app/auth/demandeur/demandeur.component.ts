import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../demandeur/user.service';
import { RouterModule } from '@angular/router';
import { DemandeurUserService } from './demandeur-user.service';

interface Request {
  qte: number;
  details: string;
  requestNumber: string;
  date: Date;
  status?: string;
}

@Component({
  selector: 'app-demandeur',
  standalone: true,
  templateUrl: './demandeur.component.html',
  styleUrls: ['./demandeur.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule],
  providers: [
    {
      provide: DemandeurUserService,
      useClass: DemandeurUserService
    }
  ]
})
export class DemandeurComponent implements OnInit {
  currentDate: Date = new Date();
  username: string = '';
  requestNumber: string = '';

  request: Request = {
    qte: 0,
    details: '',
    requestNumber: '',
    date: new Date()
  };

  constructor(
    private userService: DemandeurUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    this.username = user.username;
    this.userService.setLastRoute('/demandeur');
  
    // Vérifier s'il y a un brouillon en cours d'édition
    const currentDraft = localStorage.getItem('currentDraft');
    if (currentDraft) {
      this.request = JSON.parse(currentDraft);
      // Supprimer le brouillon en cours d'édition
      localStorage.removeItem('currentDraft');
    } else {
      this.generateRequestNumber();
    }
  }
  
  generateRequestNumber() {
    const random = Math.floor(1000 + Math.random() * 9000);
    this.requestNumber = `DEM-${random}`;
  }

  submitRequest() {
    const completeRequest = {
      ...this.request,
      requestNumber: this.requestNumber,
      date: new Date(),
      status: 'pending',
      username: this.username
    };

    // Sauvegarder la requête
    const requests = JSON.parse(localStorage.getItem('purchaseRequests') || '[]');
    requests.push(completeRequest);
    localStorage.setItem('purchaseRequests', JSON.stringify(requests));

    // Réinitialiser le formulaire
    this.request = {
      qte: 0,
      details: '',
      requestNumber: '',
      date: new Date()
    };
    
    alert('Votre demande a été soumise avec succès !');
    this.generateRequestNumber();
  }

  saveAsDraft() {
    const draft = {
      ...this.request,
      requestNumber: this.requestNumber,
      date: new Date(),
      status: 'brouillon',
      username: this.username
    };

    // Sauvegarder le brouillon
    const drafts = JSON.parse(localStorage.getItem('draftRequests') || '[]');
    drafts.push(draft);
    localStorage.setItem('draftRequests', JSON.stringify(drafts));

    // Réinitialiser le formulaire
    this.request = {
      qte: 0,
      details: '',
      requestNumber: '',
      date: new Date()
    };

    alert('Le brouillon a été enregistré avec succès !');
    this.generateRequestNumber();
  }

  goToPurchases() {
    this.router.navigate(['/purchases']);
  }
  
  validateQuantity(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value);
    
    // Empêcher les nombres négatifs
    if (value < 0) {
      value = 0;
      input.value = '0';
    }
    
    this.request.qte = value;
  }

  goToProfile() {
    console.log('Navigation vers le profil...'); // Pour debug
    this.router.navigate(['/profile']).then(() => {
      console.log('Navigation terminée');
    }).catch(err => {
      console.error('Erreur de navigation:', err);
    });
  }
}