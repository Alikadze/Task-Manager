import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AuthPayload, AuthResponce } from '../interfaces/auth-payload';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  authService = inject(AuthService);
  storageService = inject(StorageService);
  router = inject(Router);

  register(payload: AuthPayload): Observable<AuthResponce> {
    return this.authService.register(payload)
    .pipe(
      tap((res: AuthResponce) => {
        this.storageService.setItem('expiresIn', res.token.expiresIn)
        this.storageService.setItem('accessToken', res.token.accessToken);
        this.storageService.setItem('refreshToken', res.token.refreshToken);
        this.storageService.setItem('user', {
          id: res.user.id,
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          email: res.user.email,
          mobileNumber: res.user.mobileNumber,
          isActive: res.user.isActive,
          createdAt: res.user.createdAt,
          projects: res.user.projects,
          roles: res.user.roles,
          userPermissions: res.user.userPermissions,
        });
      })
    )
  }
}