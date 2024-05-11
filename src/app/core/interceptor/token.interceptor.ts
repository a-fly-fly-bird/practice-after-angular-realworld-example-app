import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../auth/services/jwt.service';

// 往请求里塞token
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(JwtService).getToken();

  // 克隆请求并设置新的头部
  const authReq = req.clone({
    headers: token
      ? // Sets or modifies a value for a given header in a clone of the original instance. If the header already exists, its value is replaced with the given value in the returned object.
        req.headers.set('Authorization', `Bearer ${token}`)
      : req.headers,
  });

  // 返回修改后的请求
  return next(authReq);
};
