import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <!-- SIDEBAR -->
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
    
        <div class="date">{{currentDate | date:'dd/MM/yyyy'}}</div>
      </div>

      <!-- MAIN CONTENT -->
      <div class="main-content">
        <div class="header">
          <h1>LISTE DES PROJETS</h1>
          <div class="search-box">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              placeholder="Rechercher un projet..."
              (input)="filterProjects()"
            >
          </div>
        </div>

        <div class="projects-grid">
          <div *ngFor="let project of filteredProjects" class="project-card">
            <div class="project-header">
              <h3>{{ project.name }}</h3>
              <span class="date">{{ project.date | date:'dd/MM/yyyy' }}</span>
            </div>
            
            <div class="project-details">
              <div class="detail-row">
                <strong>Description:</strong>
                <p>{{ project.description }}</p>
              </div>
            </div>
          </div>

          <div *ngIf="filteredProjects.length === 0" class="no-projects">
            Aucun projet trouvé
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      min-height: 100vh;
      background-color: #f5f5f5;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .sidebar {
      width: 250px;
      background: linear-gradient(180deg, #2c3e50, #34495e);
      padding: 20px;
      color: white;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .sidebar h1 {
      margin-bottom: 30px;
      font-size: 24px;
      color: #ecf0f1;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar h2 {
      margin-top: 25px;
      font-size: 16px;
      color: #3498db;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .sidebar ul {
      list-style: none;
      padding: 0;
      margin: 15px 0;
    }

    .nav-link {
      display: block;
      padding: 10px 15px;
      color: #ecf0f1;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      background: rgba(52, 152, 219, 0.1);
      color: #3498db;
      transform: translateX(5px);
    }

    .date {
      margin-top: 30px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      font-size: 14px;
      text-align: center;
    }

    .main-content {
      flex: 1;
      padding: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      color: #2c3e50;
      font-size: 1.8rem;
      margin: 0;
    }

    .search-box input {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.9rem;
      width: 250px;
      transition: all 0.3s ease;
    }

    .search-box input:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .project-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .project-header {
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .project-header h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    .project-header .date {
      color: #7f8c8d;
      font-size: 0.9rem;
      background: none;
      padding: 0;
    }

    .project-details {
      padding: 1.5rem;
    }

    .detail-row {
      margin-bottom: 1rem;
    }

    .detail-row:last-child {
      margin-bottom: 0;
    }

    .detail-row strong {
      display: block;
      color: #7f8c8d;
      margin-bottom: 0.3rem;
      font-size: 0.9rem;
    }

    .detail-row p {
      margin: 0;
      color: #2c3e50;
      line-height: 1.5;
    }

    .no-projects {
      grid-column: 1 / -1;
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      color: #7f8c8d;
      font-style: italic;
    }
  `]
})
export class ViewProjectsComponent implements OnInit {
  currentDate = new Date();
  projects: any[] = [];
  filteredProjects: any[] = [];
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
    if (!this.searchTerm.trim()) {
      this.filteredProjects = [...this.projects];
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredProjects = this.projects.filter(project => 
      project.name.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search)
    );
  }

  goToHome() {
    this.router.navigate(['/projectlist']);
  }
} 