import { Injectable } from '@angular/core';

@Injectable()
export class DemandeurUserService {
  private currentUser: any = null;
  private lastRoute: string = '';
  private readonly STORAGE_KEY = 'demandeur_user';
  private readonly DEFAULT_ROLE = 'Demandeur';

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    const savedUser = localStorage.getItem(this.STORAGE_KEY);
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    } else {
      this.currentUser = {
        username: 'Demandeur',
        role: this.DEFAULT_ROLE,
        email: '',
        phone: '',
        department: ''
      };
      this.saveUser();
    }
  }

  private saveUser() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.currentUser));
  }

  getCurrentUser() {
    return this.currentUser;
  }

  updateUser(userData: any) {
    this.currentUser = {
      ...this.currentUser,
      ...userData,
      role: this.DEFAULT_ROLE // Toujours garder le rôle Demandeur
    };
    this.saveUser();
  }

  updateUsername(username: string) {
    this.currentUser.username = username;
    this.saveUser();
  }

  getRole() {
    return this.DEFAULT_ROLE;
  }

  // Ajout des méthodes pour la gestion des routes
  setLastRoute(route: string) {
    this.lastRoute = route;
  }

  getLastRoute(): string {
    return this.lastRoute;
  }
} 