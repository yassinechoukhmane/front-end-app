import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const router = inject(Router);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const role = user.role;
  const requestedUrl = state.url;

  if (role === 'demandeur' && requestedUrl.startsWith('/demandeur')) {
    return true;
  }

  if (role === 'responsable' && requestedUrl.startsWith('/responsable')) {
    return true;
  }

  // 🚫 Mauvais rôle => redirection par défaut
  router.navigate([role === 'responsable' ? '/responsable' : '/demandeur']);
  return false;
};
