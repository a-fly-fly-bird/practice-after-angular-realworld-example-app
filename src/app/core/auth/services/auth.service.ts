import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../../model/User';
import { JwtService } from './jwt.service';
import { Result } from '../../model/Result';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: WritableSignal<User | null> = signal(null);
  isAuthenticated: Signal<boolean> = computed(() => {
    return !!this.currentUser();
  });

  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService
  ) {}

  // TypeScript 只在编译期执行静态类型检查！实际运行的是从 TypeScript 编译的 JavaScript，这些生成的 JavaScript 对类型一无所知。编译期静态类型检查在代码库内部能发挥很大作用，但对不合规范的输入（比如，从 API 处接收的输入）无能为力。
  login(credentials: { account: string; password: string }): Observable<User> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.post<any>('/api/auth/login', { ...credentials }).pipe(
      map(data => data.data),
      tap({
        next: (user: User) => {
          // 登录成功后保存Token到localStorage
          this.setAuth(user);
        },
      })
    );
  }

  // 最终都会调用这个方法来保存用户数据
  setAuth(user: User) {
    if (user.token) {
      this.jwtService.saveToken(user.token);
      this.currentUser.set(user);
    }
  }

  register(info: {
    name: string;
    password: string;
    email: string;
    age: number;
  }): Observable<string> {
    return this.http.post<Result<string>>('/api/auth/register', info).pipe(
      map(data => {
        if (data.data) {
          return data.data;
        } else {
          throw new Error(data.message);
        }
      })
    );
  }

  reset(info: { account: string; password: string }): Observable<typeof info> {
    return this.http.put<typeof info>('/api/auth/reset', info);
  }
}
