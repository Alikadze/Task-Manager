import { Injectable, inject } from '@angular/core'
import { BoardService } from '../services/board.service'
import { StorageService } from '../services/storage.service';
import { Board, Boardpayload, ColumnPayload } from '../interfaces/project';
import { BehaviorSubject, Observable, Subject, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BoardFacade {
  boardService = inject(BoardService);
  storageService = inject(StorageService);

  projectId = this.storageService.getItem('projectId');

  myBoards: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);

  updatedBoardSubject = new BehaviorSubject<Board | null>(null); 
  updatedBoard$ = this.updatedBoardSubject.asObservable();

  boards$ = this.boardService.getBoards(this.projectId);


  myProjects$ = this.myBoards.asObservable();

  createBoard(boardpayload: Boardpayload, projectId: number): Observable<Board> {
    return this.boardService.createBoard(boardpayload, projectId).pipe(
      tap((res: Board) => {
        this.storageService.setItem('name', res.name),
        this.storageService.setItem('description', res.description),
        this.storageService.setItem('position', res.position)
      })
    )
  }


  addColumn(boardId: number, projectId: number, columnPayload: ColumnPayload): Observable<Board> {
    return this.boardService.addBoardColumn(boardId, projectId, columnPayload).pipe(
      tap(updatedBoard => {
        this.updatedBoardSubject.next(updatedBoard); 
    }),
      catchError(error => {
        return throwError(() => new Error(`Error adding column: ${error.message || 'Unknown error'}`));
      })
    );
  }
  
  put<T>(url: string, updatedBoard: { columns: ColumnPayload[]; id: number; name: string; description: string; position: number; projectId: number; project: import("../interfaces/project").ProjectResponse; tasks: import("../interfaces/project").Task[]; createdAt: string; updatedAt: string; deletedAt: string; }, headers: HttpHeaders): any {
    throw new Error('Method not implemented.');
  }

  getMyBoards$(projectId: number): Observable<Board[]> {
    return this.boardService.getBoards(projectId).pipe(
      tap(boards => this.myBoards.next(boards as Board[]))
    )
  }

  getBoard(projectId: number): Board {
    const board = this.storageService.getItem('board');
    return board ? JSON.parse(board) : null;
  }

  getBoardById(boardId: number, projectId: number): Observable<Board> {
    return this.boardService.getBoardById(boardId, projectId).pipe(
      tap((response: Board) => {
      }),
      catchError((error: any) => {
        console.error('Error fetching board by ID:', error);
        return throwError(() => new Error('Error fetching board by ID'));
      })
    );
  } 

}