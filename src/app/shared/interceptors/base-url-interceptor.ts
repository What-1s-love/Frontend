import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {

  const apiReq = req.clone({
    url: `http://localhost:3000/${req.url}`
  });
  return next(apiReq);
};