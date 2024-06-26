import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Board } from '../interfaces/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends ApiService{

  getBoards(projectId?: number): Observable<Board[]> {
    const headers = new HttpHeaders().set('project', projectId!.toString());
    return this.get<Board[]>('board', null, headers);
  }

  createBoard(data: any, projectId: number): Observable<Board> {
    const headers = new HttpHeaders().set('project', projectId.toString());
    return this.post<Board>('board', data, headers);
  }

  updateBoard(data: any, projectId: number): Observable<Board> {
    const headers = new HttpHeaders().set('project', projectId.toString());
    return this.put<Board>(`board/${data.id}`, data, headers);
  }

  getBoard(id: number, projectId: number): Observable<Board> {
    const headers = new HttpHeaders().set('project', projectId!.toString());
    return this.get<Board>(`board/${id}`, null, headers);
  }

  deleteBoard(id: number, projectId: number): Observable<any> {
    const headers = new HttpHeaders().set('project', projectId.toString());
    return this.delete(`board/${id}`, null, headers);
  }

  getBoardById(boardId: number, projectId: number): Observable<Board> {
    const headers = new HttpHeaders().set('project', projectId.toString());
    const url = `${this.apiUrl}/board/${boardId}`;

    return this.httpClient.get<Board>(url, { headers })
  }
}
