import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiUrl;

  httpClient: HttpClient = inject(HttpClient);

  get<T>(path: string, params?: any, headers?: HttpHeaders): Observable<T> {
    const httpParams = new HttpParams({
      fromObject: params
    });

    return this.httpClient.get<T>(
      `${this.apiUrl}/${path}`,
      { params: httpParams, headers }
    );
  }

  post<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}/${path}`, body, { headers });
  }

  put<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.httpClient.put<T>(`${this.apiUrl}/${path}`, body, { headers });
  }

  delete<T>(path: string, params?: any, headers?: HttpHeaders): Observable<T> {
    const httpParams = new HttpParams({
      fromObject: params
    });

    return this.httpClient.delete<T>(
      `${this.apiUrl}/${path}`,
      { params: httpParams, headers }
    );
  }
}
