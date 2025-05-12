import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../demandeur/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-demandeur',
  standalone: true,
  templateUrl: './demandeur.component.html',
  styleUrls: ['./demandeur.component.scss'],
  imports: [FormsModule, CommonModule,RouterModule]
})
export class DemandeurComponent implements OnInit {
  currentDate: Date = new Date();
  username: string = '';
  requestNumber: string = '';

  request = {
    category: 'projet',
    subject: '',
    details: '',
    designation: '',
    qte: 1
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    this.username = user.username;
    this.userService.setLastRoute('/demandeur');
  
    const draft = localStorage.getItem('currentDraft');
    if (draft) {
      const draftData = JSON.parse(draft);
      this.request = {
        category: draftData.category,
        subject: draftData.subject,
        details: draftData.details,
        designation: draftData.designation,
        qte: draftData.qte
      };
      this.requestNumber = draftData.requestNumber;
      localStorage.removeItem('currentDraft'); // Nettoyer après chargement
    } else {
      this.generateRequestNumber();
    }
  }
  

  generateRequestNumber() {
    const random = Math.floor(1000 + Math.random() * 9000);
    this.requestNumber = `REQ-${random}`;
  }

  submitRequest() {
    if (this.request.qte < 1) {
      alert("La quantité doit être au moins 1");
      return;
    }
  
    const completeRequest = {
      ...this.request,
      requestNumber: this.requestNumber,
      date: this.currentDate,
      status: 'submitted'
    };
  
    this.saveToLocalStorage(completeRequest, 'purchaseRequests');
    localStorage.removeItem('currentDraft'); // ❗️ Nettoyer le brouillon temporaire
    alert('Demande enregistrée avec succès!');
    this.router.navigate(['/purchases']);
  }
  

  saveAsDraft() {
    const draftRequest = {
      ...this.request,
      requestNumber: this.requestNumber,
      date: this.currentDate,
      status: 'draft'
    };

    this.saveToLocalStorage(draftRequest, 'draftRequests');
    localStorage.removeItem('currentDraft');
    alert('Brouillon enregistré!');
    this.router.navigate(['/drafts']);
  }

  private saveToLocalStorage(requestData: any, storageKey: string) {
    const storedData = localStorage.getItem(storageKey);
    const existingRequests = storedData ? JSON.parse(storedData) : [];
    existingRequests.push(requestData);
    localStorage.setItem(storageKey, JSON.stringify(existingRequests));
  }
  
}