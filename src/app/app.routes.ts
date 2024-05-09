import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from './core/auth/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./feature/home/home.component').then(m => m.HomeComponent),
    canActivate: [
      () =>
        inject(AuthService).isAuthenticated()
          ? true
          : inject(Router).navigate(['/auth']),
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/auth/auth.component').then(m => m.AuthComponent),
    canActivate: [() => !inject(AuthService).isAuthenticated()],
  },
];
