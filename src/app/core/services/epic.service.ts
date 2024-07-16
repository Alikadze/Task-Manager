import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Epic } from '../interfaces/project';
import { Observable } from 'rxjs';
import { EpicPayload } from '../interfaces/epic';

@Injectable({
  providedIn: 'root'
})
export class EpicService extends ApiService {
  getEpics(): Observable<Epic[]> {
    return this.get<Epic[]>(`epics`);
  }

  getEpic(id: number): Observable<Epic> {
    return this.get<Epic>(`epics/${id}`);
  }

  createEpic(epic: EpicPayload): Observable<Epic> {
    return this.post<Epic>(`epics`, epic);
  }

  updateEpic(epic: Epic): Observable<Epic> {
    return this.put<Epic>(`epics/${epic.id}`, epic);
  }

  deleteEpic(id: number): Observable<any> {
    return this.delete(`epics/${id}`);
  }

}
