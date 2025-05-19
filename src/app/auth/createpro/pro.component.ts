import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.scss']
})
export class CreateproComponent implements OnInit {
  formattedDate = new Date().toLocaleDateString('fr-FR');
  
  project = {
    name: '',
    description: '',
    date: new Date()
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Vérifier s'il y a un projet en cours d'édition
    const editingProject = localStorage.getItem('editingProject');
    if (editingProject) {
      this.project = JSON.parse(editingProject);
      localStorage.removeItem('editingProject');
    }
  }

  saveProject() {
    if (!this.project.name || !this.project.description) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects.push({
      ...this.project,
      date: new Date()
    });
    
    localStorage.setItem('projects', JSON.stringify(projects));
    alert('Projet enregistré avec succès!');
    
    this.project = {
      name: '',
      description: '',
      date: new Date()
    };
  }

  goToHome() {
    this.router.navigate(['/responsable']);
  }

  goToProjects() {
    this.router.navigate(['/projectlist']);
  }
}
