import { Injectable } from '@angular/core';

const JWT_KEY = 'jwtToken';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  getToken(): string {
    return window.localStorage.getItem(JWT_KEY) ?? '';
  }

  saveToken(token: string): string {
    window.localStorage.setItem(JWT_KEY, token);
    return token;
  }

  destroyToken(): void {
    window.localStorage.removeItem(JWT_KEY);
  }
}
