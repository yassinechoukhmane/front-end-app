import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AddFournisseurComponent {
  name = '';
  phone = '';
  successMessage = '';
  hideMessage: boolean = false;  // ✅ ajout de la propriété

  onSubmit(): void {
    console.log('Fournisseur ajouté :', { name: this.name, phone: this.phone });
    this.successMessage = `Fournisseur "${this.name}" a été bien ajouté !`;
    this.hideMessage = false;

    this.name = '';
    this.phone = '';

    // Masquer progressivement après 3s
    setTimeout(() => {
      this.hideMessage = true;
    }, 3000);

    // Supprimer le message après 4s
    setTimeout(() => {
      this.successMessage = '';
    }, 4000);
  }
}
