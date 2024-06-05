import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  aipUrl = environment.apiUrl;

  httpClient: HttpClient = inject(HttpClient);

  get<T> (path: string, params?: any): Observable<T>{
    const httpParams = new HttpParams({
      fromObject: params
    })

    return this.httpClient.get<T>(
      `${this.aipUrl}/${path}`,
      {params: httpParams}
    )
  }

  post<T> (path: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${this.aipUrl}/${path}`, body)
  }

  put<T> (path: string, body: any): Observable<T> {
    return this.httpClient.put<T>(`${this.aipUrl}/${path}`, body)
  }

  delete<T> (path: string, params?: any): Observable<T> {
    const httpParams = new HttpParams({
      fromObject: params
    })

    return this.httpClient.delete<T>(
      `${this.aipUrl}/${path}`,{
      params: httpParams
    })
  }
}
