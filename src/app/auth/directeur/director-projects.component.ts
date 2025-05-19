import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-director-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <header class="page-header">
        <h1>Projets</h1>
        <div class="header-actions">
          <div class="search-box">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              (input)="filterProjects()"
              placeholder="Rechercher des projets..."
            >
            <i class="fas fa-search"></i>
          </div>
          <button class="back-button" routerLink="/directeur">
            <i class="fas fa-arrow-left"></i>
            Retour au Tableau de Bord
          </button>
        </div>
      </header>

      <div class="stats-cards">
        <div class="stat-card">
          <h3>{{totalProjects}}</h3>
          <p>Total des Projets</p>
        </div>
        <div class="stat-card">
          <h3>{{activeProjects}}</h3>
          <p>Projets Actifs</p>
        </div>
        <div class="stat-card">
          <h3>{{completedProjects}}</h3>
          <p>Projets Terminés</p>
        </div>
      </div>

      <div class="projects-grid">
        <div *ngFor="let project of filteredProjects" class="project-card">
          <div class="project-header">
            <div class="project-title">
              <h3>{{project.name}}</h3>
              <p class="project-date">{{project.date | date:'dd MMM yyyy'}}</p>
            </div>
          </div>
          
          <div class="project-details">
            <div class="detail-item">
              <strong>Description :</strong>
              <p>{{project.description}}</p>
            </div>
            <div *ngIf="project.status === 'finished'" class="project-status finished">
              <span class="icon"></span> Ce projet est terminé
            </div>
            <div *ngIf="project.status !== 'finished'" class="project-status active">
              <span class="icon"></span> Ce projet est actif 
            </div>
          </div>
          <div class="project-actions">
            <button class="btn-delete" (click)="deleteProject(project)">
              <span class="icon"></span> Supprimer
            </button>
            <button *ngIf="project.status !== 'finished'" class="btn-finish" (click)="finishProject(project)">
              <span class="icon"></span> Fin de projet
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="filteredProjects.length === 0" class="no-data">
        Aucun projet disponible
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e9ecef;
    }

    h1 {
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .search-box {
      position: relative;
      width: 300px;
    }

    .search-box input {
      width: 100%;
      padding: 0.5rem 1rem;
      padding-left: 2.5rem;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      font-size: 0.9rem;
    }

    .search-box i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #95a5a6;
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .back-button:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      text-align: center;
    }

    .stat-card h3 {
      color: #2c3e50;
      font-size: 2rem;
      margin: 0 0 0.5rem 0;
    }

    .stat-card p {
      color: #7f8c8d;
      margin: 0;
      font-size: 0.9rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .project-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .project-header {
      padding: 1.5rem;
      background: #f8f9fa;
      border-bottom: 1px solid #eee;
    }

    .project-title h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .project-date {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin: 0.5rem 0 0 0;
    }

    .project-details {
      padding: 1.5rem;
    }

    .detail-item {
      margin-bottom: 1rem;
    }

    .detail-item strong {
      display: block;
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .detail-item p {
      color: #2c3e50;
      margin: 0;
      font-size: 1rem;
      line-height: 1.5;
    }

    .project-actions {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      border-top: 1px solid #e0e0e0;
      margin-top: 15px;
    }
    .btn-delete {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 1.2rem;
      font-weight: 500;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(231, 76, 60, 0.08);
      transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
    }
    .btn-delete:hover {
      background: linear-gradient(135deg, #c0392b, #a93226);
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(192, 57, 43, 0.15);
    }
    .btn-finish {
      background: linear-gradient(135deg, #27ae60, #219150);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 1.2rem;
      font-weight: 500;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(39, 174, 96, 0.08);
      transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
    }
    .btn-finish:hover {
      background: linear-gradient(135deg, #219150, #145a32);
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(39, 174, 96, 0.15);
    }

    .no-data {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 10px;
      color: #7f8c8d;
      font-size: 1.1rem;
      margin-top: 2rem;
    }

    .project-status {
      margin-top: 1rem;
      padding: 0.8rem 1.2rem;
      border-radius: 8px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      font-size: 1rem;
    }
    .project-status.finished {
      background: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #c8e6c9;
    }
    .project-status.active {
      background: #e3f2fd;
      color: #1565c0;
      border: 1px solid #90caf9;
    }
  `]
})
export class DirectorProjectsComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];
  searchTerm: string = '';
  
  totalProjects: number = 0;
  activeProjects: number = 0;
  completedProjects: number = 0;

  constructor() {}

  ngOnInit() {
    this.loadProjects();
    this.updateStats();
  }

  loadProjects() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      this.projects = JSON.parse(savedProjects);
      this.filteredProjects = [...this.projects];
      console.log('Projets chargés:', this.projects);
    }
  }

  filterProjects() {
    if (!this.searchTerm.trim()) {
      this.filteredProjects = [...this.projects];
    } else {
      const searchTerm = this.searchTerm.toLowerCase();
      this.filteredProjects = this.projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
      );
    }
  }

  deleteProject(project: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projects = this.projects.filter(p => p !== project);
      localStorage.setItem('projects', JSON.stringify(this.projects));
      this.filterProjects();
      this.updateStats();
    }
  }

  finishProject(project: any) {
    project.status = 'finished';
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this.filterProjects();
    this.updateStats();
  }

  updateStats() {
    this.totalProjects = this.projects.length;
    this.completedProjects = this.projects.filter(p => p.status === 'finished').length;
    this.activeProjects = this.projects.length - this.completedProjects;
  }
} 