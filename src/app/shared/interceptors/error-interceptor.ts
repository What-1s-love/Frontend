import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Помилка з'єднання: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = 'Невірний запит (Bad Request). Перевірте дані.';
            break;
          case 401:
            errorMessage = 'Ви не авторизовані! Увійдіть у систему.';
            break;
          case 403:
            errorMessage = 'Доступ заборонено (Forbidden).';
            break;
          case 404:
            errorMessage = 'Ресурс не знайдено (404).';
            break;
          case 500:
            errorMessage = 'Внутрішня помилка сервера. Спробуйте пізніше.';
            break;
          default:
            errorMessage = `Невідома помилка: ${error.status} ${error.message}`;
            break;
        }
      }

      toastr.error(errorMessage, 'Помилка');

      return throwError(() => error);
    })
  );
};