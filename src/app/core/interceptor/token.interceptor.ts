import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../auth/services/jwt.service';

// 往请求里塞token
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(JwtService).getToken();
  req.clone({
    headers: token
      ? req.headers.set('Authorization', `Token ${token}`)
      : req.headers,
  });
  return next(req);
};
