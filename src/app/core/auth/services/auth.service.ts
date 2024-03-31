import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../model/User';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
  ) { }

  login(credentials: {
    account: string;
    password: string;
  }): Observable<User> {
    return this.http.post<User>('/api/auth/login', { ...credentials }).pipe(tap({
      next: (user: User) => {
        // 登录成功后保存Token到localStorage
        this.setAuth(user);
      }
    }))
  }

  // 最终都会调用这个方法来保存用户数据
  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
  }
}
