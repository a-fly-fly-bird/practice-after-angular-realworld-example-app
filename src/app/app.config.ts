import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtService } from './core/auth/services/jwt.service';
import { UserService } from './core/auth/services/user.service';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { EMPTY } from 'rxjs';
import { routes } from './app.routes';
import { tokenInterceptor } from './core/interceptor/token.interceptor';
import { provideNzIcons } from './icons-provider';

registerLocaleData(en);

function initAuth(jwtService: JwtService, userService: UserService) {
  return () => (
    jwtService.getToken()
    ?
    userService.getCurrentUser()
      : EMPTY
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [JwtService, UserService],
      multi: true,
    },
    provideNzIcons(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
