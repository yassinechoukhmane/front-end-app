import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ResponsableUserService } from './responsable-user.service';

@Component({
  selector: 'app-responsable',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss'],
  providers: [ResponsableUserService]
})
export class ResponsableComponent implements OnInit {
  today = new Date();
  username: string = '';

  constructor(
    private userService: ResponsableUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    this.username = user.username;
    this.userService.setLastRoute('/responsable');
  }

  goToCreateBC() {
    this.router.navigate(['/create-bc']); 
  }
  goToCreatePro() {
    this.router.navigate(['/createpro']);
  }
  goToCreateDemandeProjet() {
    this.router.navigate(['/create-demande-projet']);
  }
  goToAddFournisseur() {
    this.router.navigate(['/add-fournisseur']);
  }
  goToLatestRequests() {
    this.router.navigate(['/latest-requests']);
  }
  goToHome() {
    this.router.navigate(['/responsable']);
  }
  goToPurchases() {
    this.router.navigate(['/purchases']);
  }
  goToFournisseurs() {
    this.router.navigate(['/fournisseurlist']);
  }
  goToProfile() {
    this.router.navigate(['/responsable-profile']).then(() => {
      console.log('Navigation terminée');
    }).catch(err => {
      console.error('Erreur de navigation:', err);
    });
  }

  // Nouvelles méthodes de navigation
  goToBCList() {
    this.router.navigate(['/bclist']);
  }

  goToProjectList() {
    this.router.navigate(['/projectlist']);
  }

  goToDemandeProjetList() {
    this.router.navigate(['/demande-projet-list']);
  }
}
