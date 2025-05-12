// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser = {
    username: 'test user',
    email: 'test.user@example.com',
  };

  private lastRoute: string = '';

  getCurrentUser() {
    return this.currentUser;
  }

  updateUser(userData: any) {
    this.currentUser = { ...this.currentUser, ...userData };
  }

  setLastRoute(route: string) {
    this.lastRoute = route;
  }

  getLastRoute(): string {
    return this.lastRoute || '/demandeur'; // défaut
  }
}
