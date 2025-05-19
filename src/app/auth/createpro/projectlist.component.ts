import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="sidebar">
        <h1>Target Metal Works</h1>
        
        <h2>Discover</h2>
        <ul>
          <li>
            <span class="nav-link home" (click)="goToHome()">
              Home
            </span>
          </li>
        </ul>
        
        <h2>Projects</h2>
        <ul>
          <li>
            <span class="nav-link create" (click)="goToCreateProject()">
              Create Project
            </span>
          </li>
        </ul>
        
        <div class="date">{{currentDate | date:'dd/MM/yyyy'}}</div>
      </div>

      <div class="main-content">
        <h1>LISTE DES PROJETS</h1>
        <div class="stats-cards">
          <div class="stat-card">
            <h3>{{ totalProjects }}</h3>
            <p>Total Projets</p>
          </div>
          <div class="stat-card">
            <h3>{{ activeProjects }}</h3>
            <p>Projets Actifs</p>
          </div>
          <div class="stat-card">
            <h3>{{ completedProjects }}</h3>
            <p>Projets Terminés</p>
          </div>
        </div>
        <div class="search-bar">
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            placeholder="Rechercher un projet..."
            (input)="filterProjects()"
          >
        </div>
        <div class="projects-grid">
          <div *ngFor="let project of filteredProjects" class="project-card">
            <div class="project-header">
              <div class="project-title">
                <h3>{{project.name}}</h3>
                <p class="project-date">{{project.date | date:'dd/MM/yyyy'}}</p>
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
              <button class="btn-delete" (click)="deleteProject(project)"><span class="icon"></span> Supprimer</button>
              <button *ngIf="project.status !== 'finished'" class="btn-finish" (click)="finishProject(project)"><span class="icon"></span> Fin de projet</button>
            </div>
          </div>
        </div>
        <div *ngIf="filteredProjects.length === 0" class="no-data">Aucun projet trouvé</div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
    }

    .sidebar {
      width: 250px;
      background: linear-gradient(180deg, #2c3e50, #34495e);
      padding: 20px;
      color: white;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

      h1 {
        margin-bottom: 30px;
        font-size: 24px;
        color: #ecf0f1;
        padding-bottom: 15px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      }

      h2 {
        margin-top: 25px;
        font-size: 16px;
        color: #3498db;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 15px 0;

        li {
          margin: 8px 0;

          .nav-link {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            color: #ecf0f1;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.3s ease;
            font-weight: 500;
            background: transparent;
            border: 1px solid transparent;

            &:hover {
              background: rgba(52, 152, 219, 0.1);
              border-color: rgba(52, 152, 219, 0.2);
              color: #3498db;
              transform: translateX(5px);
            }
          }
        }
      }

      .date {
        margin-top: 30px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        font-size: 14px;
        color: #ecf0f1;
        text-align: center;
      }
    }

    .main-content {
      flex: 1;
      padding: 20px;
      background-color: #ecf0f1;

      h1 {
        margin-bottom: 30px;
        color: #2c3e50;
      }
    }

    .form-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .search-bar {
      margin-bottom: 20px;

      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #3498db;
        }
      }
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      th {
        background-color: #f8f9fa;
        color: #2c3e50;
        font-weight: 500;
      }

      .description-cell {
        max-width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .actions {
        display: flex;
        gap: 8px;
      }

      .action-btn {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;

        &.edit {
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: white;

          &:hover {
            background: linear-gradient(135deg, #2980b9, #2472a4);
          }
        }

        &.delete {
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

        &.delete:hover {
          background: linear-gradient(135deg, #c0392b, #a93226);
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.15);
        }
      }
    }

    .no-data {
      text-align: center;
      color: #7f8c8d;
      font-style: italic;
    }

    .home-button {
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .home-button:hover {
      background-color: #2980b9;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-card h3 {
      font-size: 2rem;
      color: #2c3e50;
      margin: 0 0 0.5rem 0;
    }

    .stat-card p {
      color: #7f8c8d;
      margin: 0;
      font-size: 1rem;
    }

    .search-bar {
      margin-bottom: 25px;
    }

    .search-bar input {
      width: 100%;
      padding: 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s ease;
      background-color: #f8f9fa;
    }

    .search-bar input:focus {
      border-color: #3949ab;
      box-shadow: 0 0 0 3px rgba(57,73,171,0.1);
      outline: none;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .project-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
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
      box-shadow: 0 2px 6px rgba(231,76,60,0.08);
      transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
    }

    .btn-delete:hover {
      background: linear-gradient(135deg, #c0392b, #a93226);
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(192,57,43,0.15);
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
      box-shadow: 0 2px 6px rgba(39,174,96,0.08);
      transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
    }

    .btn-finish:hover {
      background: linear-gradient(135deg, #219150, #145a32);
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(39,174,96,0.15);
    }
  `]
})
export class ProjectListComponent implements OnInit {
  currentDate = new Date();
  projects: any[] = [];
  filteredProjects: any[] = [];
  searchTerm: string = '';
  totalProjects: number = 0;
  activeProjects: number = 0;
  completedProjects: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProjects();
    this.updateStats();
  }

  loadProjects() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      this.projects = JSON.parse(savedProjects);
      this.filteredProjects = [...this.projects];
    }
    this.updateStats();
  }

  filterProjects() {
    if (!this.searchTerm) {
      this.filteredProjects = [...this.projects];
    } else {
      const search = this.searchTerm.toLowerCase();
      this.filteredProjects = this.projects.filter(project => 
        project.name.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search)
      );
    }
  }

  editProject(project: any) {
    localStorage.setItem('editingProject', JSON.stringify(project));
    this.router.navigate(['/createpro']);
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

  goToHome() {
    this.router.navigate(['/responsable']);
  }

  goToCreateProject() {
    this.router.navigate(['/createpro']);
  }
}
