import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.old.scss']
})
export class LoginComponent {
  showPassword = false;
  password = '';
  email = '';

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault(); // Empêche le rechargement
    }

    // 🔐 Définir le rôle en fonction de l'email (à adapter à ton backend plus tard)
    const role = this.email.includes('responsable') ? 'responsable' : 'demandeur';

    // 💾 Sauvegarde du rôle et token simulé
    const user = {
      email: this.email,
      role: role
    };

    localStorage.setItem('authToken', 'simulated-token');
    localStorage.setItem('user', JSON.stringify(user));

    // 🚀 Redirection selon le rôle
    if (role === 'responsable') {
      this.router.navigate(['/responsable']);
    } else {
      this.router.navigate(['/demandeur']);
    }
  }
}
