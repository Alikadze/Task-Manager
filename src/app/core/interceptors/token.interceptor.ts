import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthFacade } from '../facades/auth.facade';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authFacade = inject(AuthFacade);
  const accessToken = authFacade.accessToken;

  if (accessToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log('clonedRequest', clonedRequest)
    console.log('accessToken', accessToken)

    return next(clonedRequest);
    
  }
  console.log('req', req)

  return next(req);
};
