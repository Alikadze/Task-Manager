import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthFacade } from '../facades/auth.facade';
import { catchError, map, mergeMap, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authFacade = inject(AuthFacade);
  const authService = inject(AuthService);

  const accessToken = authFacade.accessToken;
  const refreshToken = authFacade.refreshToken as string;

  if (!accessToken) {
    return next(req);
  }

  return next(req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  })).pipe(
    catchError((err: any) => {
      if(err.status === 401){
        return authService.token(refreshToken)
          .pipe(
            mergeMap((res: any) => {
              localStorage.setItem('accessToken', res.token.accessToken);
              localStorage.setItem('accessToken', res.token.refreshToken);
              
              return next(req.clone({
                headers: req.headers.set('Authorization', `Bearer ${res.token.accessToken}`)
              }));
            })
          )
      }
      return throwError(() => err);
    })
  )
};
