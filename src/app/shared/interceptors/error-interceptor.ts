import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      const serverMessage = error.error?.error; 

      if (serverMessage) {
        errorMessage = serverMessage;
      } else {
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Помилка з'єднання: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 400: errorMessage = 'Невірні дані запиту.'; break;
            case 401: errorMessage = 'Необхідна авторизація.'; break;
            case 403: errorMessage = 'Доступ заборонено.'; break;
            case 404: errorMessage = 'Ресурс не знайдено.'; break;
            case 500: errorMessage = 'Помилка сервера.'; break;
            default: errorMessage = `Помилка: ${error.message}`; break;
          }
        }
      }

      toastr.error(errorMessage, 'Увага');

      return throwError(() => error);
    })
  );
};