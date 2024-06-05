import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { AuthPayload, AuthResponce } from '../interfaces/auth-payload';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  apiUrl = environment.apiUrl

  register(payload: AuthPayload): Observable<AuthResponce> {
    return this.http.post<AuthResponce>(`${this.apiUrl}/auth/signup`, payload);
  }

}
