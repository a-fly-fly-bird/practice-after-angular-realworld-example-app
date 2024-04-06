import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../model/User';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
  ) {}

  // TypeScript 只在编译期执行静态类型检查！实际运行的是从 TypeScript 编译的 JavaScript，这些生成的 JavaScript 对类型一无所知。编译期静态类型检查在代码库内部能发挥很大作用，但对不合规范的输入（比如，从 API 处接收的输入）无能为力。
  login(credentials: { account: string; password: string }): Observable<User> {
    return this.http.post<User>('/api/auth/login', { ...credentials }).pipe(
      tap({
        next: (user: User) => {
          // 登录成功后保存Token到localStorage
          this.setAuth(user);
        },
      }),
    );
  }

  // 最终都会调用这个方法来保存用户数据
  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
  }
}
