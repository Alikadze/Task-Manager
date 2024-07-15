import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { Board, Column, ColumnPayload } from '../interfaces/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends ApiService{

  getBoards(projectId?: number): Observable<Board[]> {
    return this.get<Board[]>('board', null);
  }

  createBoard(data: any, projectId: number): Observable<Board> {
    return this.post<Board>('board', data);
  }

  updateBoard(data: any, boardId: number, projectId: number): Observable<Board> {
    const url = `${this.apiUrl}/board/${boardId}`;
    return this.put<Board>(url, data);
  }

  getBoard(id: number, projectId: number): Observable<Board> {
    return this.get<Board>(`board/${id}`, null);
  }

  deleteBoard(id: number, projectId: number): Observable<any> {
    return this.delete(`board/${id}`, null);
  }

  getBoardById(boardId: number, projectId: number): Observable<Board> {
    const url = `${this.apiUrl}/board/${boardId}`;

    return this.httpClient.get<Board>(url,).pipe(
      map(response => {
        if (typeof response === 'object' && response !== null) {
          return response as Board;
        } else {
          throw new Error('Invalid response format');
        }
      }),
      catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Client-side error: ${error.error.message}`;
        } else {
          errorMsg = `Server-side error: ${error.status} - ${error.statusText}`;
        }
        console.error(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  addBoardColumn(boardId: string | number, projectId: number, columnPayload: ColumnPayload): Observable<Board> {
    return this.get<Board>(`board/${boardId.toString()}`, null).pipe(
      map(board => {
        const newColumn: Column = {
          board: boardId.toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          boardId: boardId.toString(),
          ...columnPayload 
        };

        board.columns.push(newColumn);
        return board;
      }),
      switchMap(updatedBoard => {
        const url = `board/${boardId.toString()}`;
        return this.put<Board>(url, updatedBoard);
      })
    );
  }
}
