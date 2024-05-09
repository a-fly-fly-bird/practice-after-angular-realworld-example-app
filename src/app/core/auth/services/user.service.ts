import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { User } from '../../model/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private router: Router,
  ) {}

  getCurrentUser(): Observable<User> {
    console.info('start');
    return this.http.get<User>('/api/user/').pipe(
      // https://medium.com/@nile.bits/angular-observable-error-handling-best-practices-938982478513
      catchError((error: Error) => {
        // Handle the error here
        console.error('An error occurred:', error);
        // Optionally, re-throw the error or return a default value
        return throwError('Something went wrong');
      }),
      tap({
        next: (user: User) => {
          console.log('getCurrentUser', user);
          this.authService.setAuth(user);
        },
        // This block will only execute if catchError is used
        error: (err) => {
          console.log('err', err);
          this.router.navigate(['/auth']);
        },
      }),
      shareReplay(1),
    );
  }

  update(user: Partial<User>): Observable<{ user: User }> {
    return this.http.put<{ user: User }>('/api/user', { user }).pipe(
      tap(({ user }) => {
        this.authService.currentUser.set(user);
      }),
    );
  }
}
