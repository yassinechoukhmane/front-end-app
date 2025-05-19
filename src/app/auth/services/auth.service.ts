import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  // Méthode simplifiée qui redirige toujours vers la page directeur
  login(email: string, password: string) {
    const user = {
      email: 'directeur@example.com',
      role: 'directeur',
      fullName: 'Directeur Général'
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/directeur']);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/directeur']);
  }

  getCurrentUser() {
    return {
      email: 'directeur@example.com',
      role: 'directeur',
      fullName: 'Directeur Général'
    };
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      const response = await fetch('votre-api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'email de réinitialisation');
      }
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      throw error;
    }
  }
} 