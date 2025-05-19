import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
    this.authService.login(this.email, this.password);
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

  sendResetLink() {
    if (this.resetEmail) {
      this.router.navigate(['/directeur']);
    }
  }
}
