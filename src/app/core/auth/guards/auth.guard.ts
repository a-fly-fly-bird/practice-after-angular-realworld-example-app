import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { JwtService } from './../services/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(JwtService).getToken();
  if (token !== "") {
    return true;
  } else {
    inject(Router).navigate(['auth'])
    return false;
  }
};
