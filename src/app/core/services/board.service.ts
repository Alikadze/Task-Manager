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
    const headers = new HttpHeaders().set('project', projectId!.toString());
    return this.get<Board[]>('board', null, headers);
  }

  createBoard(data: any, projectId: number): Observable<Board> {
    const headers = new HttpHeaders().set('project', projectId.toString());
    return this.post<Board>('board', data, headers);
  }

  updateBoard(data: any, boardId: number, projectId: number): Observable<Board> {
    const headers = new HttpHeaders().set('project', projectId.toString());
    const url = `${this.apiUrl}/board/${boardId}`;
    return this.put<Board>(url, data, headers);
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

    return this.httpClient.get<Board>(url, { headers }).pipe(
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
    const headers = new HttpHeaders().set('project', projectId.toString());
    return this.get<Board>(`board/${boardId.toString()}`, null, headers).pipe(
      map(board => {
        // Create a new column object with the required properties
        const newColumn: Column = {
          id: 0,
          board: boardId.toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          boardId: boardId.toString(),
          ...columnPayload
        };
  
        // Add the new column to the board's columns array
        board.columns.push(newColumn);
        return board;
      }),
      switchMap(updatedBoard => {
        // Use PUT to update the board with the new column
        const url = `board/${boardId.toString()}`;
        return this.put<Board>(url, updatedBoard, headers);
      })
    );
  }
}
