import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../demandeur/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsable',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss']
})
export class ResponsableComponent implements OnInit {
  today = new Date();
  username: string = '';

  constructor(
    private userService: UserService,
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
    this.router.navigate(['/fournisseurs']);
  }
}
