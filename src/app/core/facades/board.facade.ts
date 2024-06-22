import { Injectable, inject } from '@angular/core'
import { BoardService } from '../services/board.service'
import { StorageService } from '../services/storage.service';
import { Board, Boardpayload } from '../interfaces/project';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BoardFacade {
  boardService = inject(BoardService);
  storageService = inject(StorageService);

  myBoards: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);

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
    return this.boardService.getBoardById(boardId, projectId);
  }
}