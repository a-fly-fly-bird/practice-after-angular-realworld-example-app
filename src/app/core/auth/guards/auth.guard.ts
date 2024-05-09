import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const isAuthenticated = inject(AuthService).isAuthenticated();
  console.log('isAuthenticated', isAuthenticated);
  return isAuthenticated;
};
