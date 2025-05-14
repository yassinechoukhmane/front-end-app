import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-createpro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.scss']
})
export class CreateproComponent {
    currentDate = new Date().toLocaleDateString();
    demandeAchatId: string = '';
    formattedDate = new Date().toLocaleDateString('fr-FR');
    constructor(private router: Router) {} 

  project = {
    name: '',
    description: '',
    id: ''
    
  };

  saveProject() {
    // Récupérer les projets existants
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Ajouter le nouveau projet avec toutes les données
    existingProjects.push({
      ...this.project,
      demandeAchatId: this.demandeAchatId,
      date: this.formattedDate
    });
    
    // Sauvegarder dans localStorage
    localStorage.setItem('projects', JSON.stringify(existingProjects));
    
    alert('Project saved successfully!');
    
    // Réinitialiser le formulaire
    this.project = {
      name: '',
      description: '',
      id: ''
    };
    this.demandeAchatId = '';
  }
  goToPurchases() {
    this.router.navigate(['/purchases']);
  }
  goToProjects() {
    this.router.navigate(['/projectlist']);
  }
}
