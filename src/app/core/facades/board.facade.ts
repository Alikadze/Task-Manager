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

  myBoards: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);

  updatedBoardSubject = new BehaviorSubject<Board | null>(null); 
  updatedBoard$ = this.updatedBoardSubject.asObservable();


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

  updateBoard(boardpayload: Boardpayload,boardId: number, projectId: number) {
    return this.boardService.updateBoard(boardpayload, boardId, projectId).pipe(
      tap((res: Board) => {
        // this.storageService.setItem('columnName', res.columns.name)
      })
    )
  }

  addColumn(boardId: number, projectId: number, columnPayload: ColumnPayload): Observable<Board> {
    return this.boardService.addBoardColumn(boardId, projectId, columnPayload).pipe(
      tap(updatedBoard => {
        console.log('Column added successfully:', updatedBoard); 
        console.log('Emitting updated board via updatedBoardSubject'); // Additional log
        this.updatedBoardSubject.next(updatedBoard); 
    }),
      catchError(error => {
        console.error('Error adding column:', error);
        return throwError(() => new Error(`Error adding column: ${error.message || 'Unknown error'}`));
      })
    );
  }
  
  put<T>(url: string, updatedBoard: { columns: ColumnPayload[]; id: number; name: string; description: string; position: number; projectId: number; project: import("../interfaces/project").ProjectResponse; tasks: import("../interfaces/project").Task2[]; createdAt: string; updatedAt: string; deletedAt: string; }, headers: HttpHeaders): any {
    throw new Error('Method not implemented.');
  }

  getMyBoards$(projectId: number): Observable<Board[]> {
    return this.boardService.getBoards().pipe(
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
        console.log('Full response:', response);
      }),
      catchError((error: any) => {
        console.error('Error fetching board by ID:', error);
        return throwError(() => new Error('Error fetching board by ID'));
      })
    );
  } 

}