import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  aipUrl = environment.apiUrl;

  http: HttpClient = inject(HttpClient);

  get<T> (path: string, params?: any): Observable<T>{
    const httpParams = new HttpParams({
      fromObject: params
    })

    return this.http.get<T>(
      `${this.aipUrl}/${path}`,
      {params: httpParams}
    )
  }

  post<T> (path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.aipUrl}/${path}`, body)
  }

  put<T> (path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.aipUrl}/${path}`, body)
  }

  delete<T> (path: string, params?: any): Observable<T> {
    const httpParams = new HttpParams({
      fromObject: params
    })

    return this.http.delete<T>(
      `${this.aipUrl}/${path}`,{
      params: httpParams
    })
  }
}
