import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { baseUrlInterceptor } from './shared/interceptors/base-url-interceptor';
import { authInterceptor } from './shared/interceptors/auth-interceptor';
import { errorInterceptor } from './shared/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
    provideAnimations(), 
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right', 
      preventDuplicates: true,
    }),

    provideHttpClient(withInterceptors([
      baseUrlInterceptor,
      authInterceptor,
      errorInterceptor 
    ])) 
    ]
};