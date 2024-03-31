import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtService } from './core/auth/services/jwt.service';
import { UserService } from './core/auth/services/user.service';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { routes } from './app.routes';
import { tokenInterceptor } from './core/interceptor/token.interceptor';

function initAuth(jwtService: JwtService, userService: UserService) {
  return () => {jwtService.getToken() ? userService.getCurrentUser() : EMPTY}
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [JwtService, UserService],
      multi: true
    }],
};
