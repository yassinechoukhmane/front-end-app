import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  date: Date;
  demandeAchatId: string;
}

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Liste des Projets</h2>
        <div class="search-bar">
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            placeholder="Rechercher un projet..."
            (input)="filterProjects()"
          >
        </div>
      </div>

      <div class="projects-container">
        <table>
          <thead>
            <tr>
              <th>Demande d'achat ID</th>
              <th>Titre</th>
              <th>Projet ID</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let project of filteredProjects">
              <td>{{ project.demandeAchatId }}</td>
              <td>{{ project.name }}</td>
              <td>{{ project.id }}</td>
              <td>{{ project.description }}</td>
              <td>{{ project.date }}</td>
              <td class="actions">
                <button class="edit-btn" (click)="editProject(project)">Modifier</button>
                <button class="delete-btn" (click)="deleteProject(project)">Supprimer</button>
              </td>
            </tr>
            <tr *ngIf="filteredProjects.length === 0">
              <td colspan="6" class="no-data">Aucun projet trouvé</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    h2 {
      color: #2c3e50;
      margin: 0;
    }

    .search-bar input {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 250px;
      font-size: 14px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f8f9fa;
      color: #2c3e50;
      font-weight: 600;
    }

    tr:hover {
      background-color: #f5f6f7;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    button {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }

    .edit-btn {
      background-color: #3498db;
      color: white;
    }

    .edit-btn:hover {
      background-color: #2980b9;
    }

    .delete-btn {
      background-color: #e74c3c;
      color: white;
    }

    .delete-btn:hover {
      background-color: #c0392b;
    }

    .no-data {
      text-align: center;
      color: #7f8c8d;
      font-style: italic;
    }
  `]
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      this.projects = JSON.parse(savedProjects);
      this.filteredProjects = [...this.projects];
    }
  }

  filterProjects() {
    if (!this.searchTerm) {
      this.filteredProjects = [...this.projects];
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredProjects = this.projects.filter(project => 
      project.name.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      project.id.toString().includes(search) ||
      project.demandeAchatId.toLowerCase().includes(search)
    );
  }

  editProject(project: Project) {
    // Stocker le projet à éditer dans le localStorage
    localStorage.setItem('editingProject', JSON.stringify(project));
    this.router.navigate(['/createpro']);
  }

  deleteProject(project: Project) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projects = this.projects.filter(p => p.id !== project.id);
      localStorage.setItem('projects', JSON.stringify(this.projects));
      this.filterProjects();
    }
  }
}
