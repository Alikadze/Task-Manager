import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Corrected import path

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiUrl;

  httpClient: HttpClient = inject(HttpClient);

  get<T>(path: string, params?: any, headers?: HttpHeaders): Observable<T> {
    let options = {
      headers: headers || new HttpHeaders(),
      params: new HttpParams()
    };

    if (params) {
      options.params = new HttpParams({ fromObject: params });
    }

    return this.httpClient.get<T>(`${this.apiUrl}/${path}`, options);
  }

  post<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    let options = {
      headers: headers || new HttpHeaders()
    };

    return this.httpClient.post<T>(`${this.apiUrl}/${path}`, body, options);
  }

  put<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    let options = {
      headers: headers || new HttpHeaders()
    };

    return this.httpClient.put<T>(`${this.apiUrl}/${path}`, body, options);
  }

  delete<T>(path: string, params?: any, headers?: HttpHeaders): Observable<T> {
    let options = {
      headers: headers || new HttpHeaders(),
      params: new HttpParams()
    };

    if (params) {
      options.params = new HttpParams({ fromObject: params });
    }

    return this.httpClient.delete<T>(`${this.apiUrl}/${path}`, options);
  }
}