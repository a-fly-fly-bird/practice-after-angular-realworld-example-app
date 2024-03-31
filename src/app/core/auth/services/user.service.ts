import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { User } from '../../model/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient, private readonly authService: AuthService) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/user/').pipe(
      tap({
        next: (user: User) => {
          this.authService.setAuth(user);
        },
        error: (err) => {
          console.log(err);
        }
      }),
      shareReplay(1)
    )
  }
}
