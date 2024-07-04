import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { BoardFacade } from '../../../core/facades/board.facade';
import { AsyncPipe, JsonPipe, DatePipe, NgIf, NgFor, CommonModule } from '@angular/common';
import { ProjectFacade } from '../../../core/facades/project.facade';
import { ActivatedRoute } from '@angular/router';
import { Board, Boardpayload, ColumnPayload, Task, } from '../../../core/interfaces/project';
import { BehaviorSubject, Observable, Subject, catchError, of, switchMap, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardTestCopy } from '../../../core/models/Board copy';
import { AddColFormComponent } from "./add-col-form/add-col-form.component";
import { SidebarComponent } from "./sidebar/sidebar.component";


@Component({
    selector: 'app-show-board',
    standalone: true,
    templateUrl: './show-board.component.html',
    styleUrl: './show-board.component.scss',
    imports: [
        MatSidenavModule,
        MatButtonModule,
        AsyncPipe,
        JsonPipe,
        DatePipe,
        MatExpansionModule,
        MatDivider,
        CdkDropList,
        CdkDrag,
        CdkDropListGroup,
        CdkDragPlaceholder,
        ReactiveFormsModule,
        NgFor,
        NgIf,
        AddColFormComponent,
        CommonModule,
        MatDivider,
        SidebarComponent
    ]
})
export class ShowBoardComponent {
  route = inject(ActivatedRoute);
  boardFacade = inject(BoardFacade);
  projectFacade = inject(ProjectFacade);
  cdr = inject(ChangeDetectorRef);

  showFiller = true; 

  readonly panelOpenState = signal(false);

  isExpaned: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  boardId!: number;
  projectId: number = this.projectFacade.getProjectId();

  board$: Observable<Board | null> = this.boardFacade.updatedBoard$.pipe(
    switchMap(updatedBoard => { // Switch to the latest board data
      if (updatedBoard) {
        return of(updatedBoard); 
      } else {
        return this.boardFacade.getBoardById(this.boardId, this.projectId); // Fetch initial board
      }
    }),
    tap(board => console.log('Board loaded/updated:', board)) // Optional: Log for debugging
  );
  
  
  errorMessage$: Observable<string | null> | undefined;

  private boardSubject = new BehaviorSubject<Board | null>(null);
  private destroy$ = new Subject<void>();


  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBoard();
  }

  controlExpland(): void {
    this.isExpaned.next(!this.isExpaned.value);
    this.cdr.markForCheck();
  }

  loadBoard(): void {
    this.board$ = this.boardFacade.getBoardById(this.boardId, this.projectId).pipe(
      tap((board) => console.log('Board loaded:', board)), // Log for debugging
      tap((board) => this.boardFacade.updatedBoardSubject.next(board)), // Set initial value
      catchError((err) => {
        this.errorMessage$ = of(err.message ?? 'An unknown error occurred');
        console.error('Error loading board:', err);
        return of(null);
      }),
      tap((board) => this.boardSubject.next(board)) // Update the BehaviorSubject
    );
  }

  boardTestCopy!: Boardpayload;

  
  transformBoardToBoardTestCopy(board: Board): void {
    const columns: ColumnPayload[] = board.columns.map((column, index) => ({
      name: column.name,
      description: column.description,
      position: index,
      boardId: board.id,
      taskStatus: column.taskStatus,
      tasks: column.tasks?.map(task => ({
        id: task.id,
        title: task.name,
        description: task.description,
        status: task.taskStatus
      }) as Task)
    }));

    this.boardTestCopy = new BoardTestCopy(
      board.name,
      board.description,
      board.position,
      columns
    );

    console.log('Transformed Board:', this.boardTestCopy);
  }


  
  dropTest(event: CdkDragDrop<Task[] | undefined>) {
    if (!event.previousContainer.data || !event.container.data) {
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 