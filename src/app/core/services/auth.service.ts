import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { AuthPayload, AuthResponce } from '../interfaces/auth-payload';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {


  register(payload: AuthPayload): Observable<AuthResponce> {
    return this.httpClient.post<AuthResponce>(`${this.apiUrl}/auth/signup`, payload);
  }

  login(payload: AuthPayload): Observable<AuthResponce> {
    return this.httpClient.post<AuthResponce>( `${this.apiUrl}/auth/login`, payload)
  }
 
  token(refreshToken: string): Observable<AuthResponce> {
    return this.httpClient.post<AuthResponce>(`${this.apiUrl}/auth/token`, {refreshToken})
  }
}