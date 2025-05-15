import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from '../models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  resetEmail: string = '';
  errorMessage: string = '';
  showForgotPassword: boolean = false;
  resetSent: boolean = false;
  showPassword: boolean = false;
  showResetModal: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response: LoginResponse) => {
          this.router.navigate(['/dashboard']);
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur de connexion:', error);
        }
      );
    }
  }

  toggleForgotPassword() {
    this.showForgotPassword = !this.showForgotPassword;
    this.resetSent = false;
    this.errorMessage = '';
    this.resetEmail = '';
  }

  sendResetEmail() {
    if (!this.resetEmail) {
      this.errorMessage = 'Veuillez entrer votre email';
      return;
    }

    if (!this.isValidEmail(this.resetEmail)) {
      this.errorMessage = 'Veuillez entrer un email valide';
      return;
    }

    setTimeout(() => {
      this.resetSent = true;
      this.errorMessage = '';
    }, 1500);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  forgotPassword() {
    this.showResetModal = true;
  }

  closeResetModal() {
    this.showResetModal = false;
    this.resetEmail = '';
  }

  async sendResetLink() {
    if (this.resetEmail) {
      try {
        await this.authService.sendPasswordResetEmail(this.resetEmail);
        alert('Un email de réinitialisation a été envoyé à votre adresse.');
        this.closeResetModal();
      } catch (error: unknown) {
        alert('Une erreur est survenue. Veuillez réessayer.');
        if (error instanceof Error) {
          console.error('Erreur lors de la réinitialisation:', error.message);
        }
      }
    }
  }
}
