import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./feature/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadComponent: () => import('./core/auth/auth.component').then((m) => m.AuthComponent),
  }
];
