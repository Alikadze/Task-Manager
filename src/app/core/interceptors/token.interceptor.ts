import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthFacade } from '../facades/auth.facade';
import { catchError, mergeMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authFacade = inject(AuthFacade);
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = authFacade.accessToken;
  const refreshToken = authFacade.refreshToken as string;

  if (!accessToken) {
    return next(req);
  }

  return next(req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  })).pipe(
    catchError((err: any) => {
      if (err.status === 401 && refreshToken) {
        return authService.token(refreshToken)
          .pipe(
            mergeMap((res: any) => {
              localStorage.setItem('accessToken', res.token.accessToken);
              localStorage.setItem('refreshToken', res.token.refreshToken);

              return next(req.clone({
                headers: req.headers.set('Authorization', `Bearer ${res.token.accessToken}`)
              }));
            }),
            catchError((res) => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');

              router.navigate(['/']);

              return throwError(() => res);
            })
          );
      }
      return throwError(() => err);
    })
  );
};
