import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class AddFournisseurComponent implements OnInit {
  currentDate = new Date();
  message: string = '';
  messageType: string = '';

  fournisseur = {
    name: '',
    phone: '',
    email: '',
    address: '',
    date: new Date()
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Vérifier s'il y a un fournisseur en cours d'édition
    const editingFournisseur = localStorage.getItem('editingFournisseur');
    if (editingFournisseur) {
      this.fournisseur = JSON.parse(editingFournisseur);
      localStorage.removeItem('editingFournisseur');
    }
  }

  saveFournisseur() {
    if (!this.validateForm()) {
      this.showMessage('Veuillez remplir tous les champs correctement. Vérifiez le format du numéro de téléphone (10 chiffres) et de l\'email.', 'error');
      return;
    }

    const fournisseurs = JSON.parse(localStorage.getItem('fournisseurs') || '[]');
    
    // Vérifier si le numéro de téléphone existe déjà
    if (fournisseurs.some((f: any) => f.phone === this.fournisseur.phone)) {
      this.showMessage('Ce numéro de téléphone est déjà associé à un autre fournisseur', 'error');
      return;
    }

    fournisseurs.push({
      ...this.fournisseur,
      date: new Date()
    });
    
    localStorage.setItem('fournisseurs', JSON.stringify(fournisseurs));
    this.showMessage('Le fournisseur a été ajouté avec succès', 'success');
    this.resetForm();
  }

  validateForm(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Pour un numéro à 10 chiffres

    return Boolean(this.fournisseur.name) &&
           phoneRegex.test(this.fournisseur.phone) &&
           Boolean(this.fournisseur.address) &&
           emailRegex.test(this.fournisseur.email);
  }

  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  resetForm() {
    this.fournisseur = {
      name: '',
      phone: '',
      email: '',
      address: '',
      date: new Date()
    };
  }

  goToHome() {
    this.router.navigate(['/responsable']);
  }

  goToList() {
    this.router.navigate(['/fournisseurlist']);
  }
}
