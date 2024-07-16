import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { BoardFacade } from '../../../core/facades/board.facade';
import { AsyncPipe, JsonPipe, DatePipe, NgIf, NgFor, CommonModule } from '@angular/common';
import { ProjectFacade } from '../../../core/facades/project.facade';
import { ActivatedRoute } from '@angular/router';
import { Board, Boardpayload, Column, Task } from '../../../core/interfaces/project';
import { BehaviorSubject, Observable, Subject, catchError, combineLatest, of, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup, CdkDragPlaceholder, CdkDragPreview } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardTestCopy } from '../../../core/models/Board copy';
import { AddColFormComponent } from "./add-col-form/add-col-form.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TaskFacade } from '../../../core/facades/task.facade';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AddTaskFormComponent } from '../tasks/add-task-form/add-task-form.component';

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
        CdkDragPreview,
        CdkDragPlaceholder,
        ReactiveFormsModule,
        NgFor,
        NgIf,
        AddColFormComponent,
        CommonModule,
        SidebarComponent,
        NgxSkeletonLoaderModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        AddTaskFormComponent
    ]
})
export class ShowBoardComponent implements OnInit, OnDestroy, AfterViewInit {
  route = inject(ActivatedRoute);
  boardFacade = inject(BoardFacade);
  projectFacade = inject(ProjectFacade);
  cdr = inject(ChangeDetectorRef);
  taskFacade = inject(TaskFacade);
  ngZone = inject(NgZone);

  @ViewChild('addTaskExpansionPanel') addTaskExpansionPanel!: MatExpansionPanel;


  showFiller = true;
  readonly panelOpenState = new BehaviorSubject<boolean>(false);
  isExpaned: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  boardId!: number;
  projectId: number = this.projectFacade.getProjectId();

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  boardWithTasks$!: Observable<[Board, Task[]]>;
  errorMessage$: Observable<string | null> | undefined;
  private destroy$ = new Subject<void>();

  boardTestCopy!: Boardpayload;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap(params => {
        this.boardId = Number(params.get('id'));
        this.loadBoard();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  controlExpland(): void {
    this.isExpaned.next(!this.isExpaned.value);
    this.cdr.markForCheck();
  }

  loadBoard(): void {
    this.isLoading$.next(true);

    this.boardWithTasks$ = combineLatest([
      this.boardFacade.getBoardById(this.boardId, this.projectId),
      this.taskFacade.getTasks(this.boardId, true)
    ]).pipe(
      tap(([board, tasks]) => {
        console.log('Board loaded:', board);
        this.transformBoardToBoardTestCopy(board, tasks);
        this.boardFacade.updatedBoardSubject.next(board);
        this.isLoading$.next(false);
      }),
      catchError(err => {
        this.errorMessage$ = of(err.message ?? 'An unknown error occurred');
        console.error('Error loading board:', err);
        this.isLoading$.next(false);
        return of(null);
      })
    ) as Observable<[Board, Task[]]>;
  }

  transformBoardToBoardTestCopy(board: Board, tasks: Task[]): void {
    const columns: Column[] = board.columns.map((column, index) => ({
      id: column.id,
      name: column.name,
      description: column.description,
      position: index,
      boardId: board.id,
      taskStatus: column.taskStatus,
      tasks: tasks.filter(task => task.boardColumnId === column.id).map(task => ({
        id: task.id,
        title: task.name,
        description: task.description,
        status: task.taskStatus
      })),
      createdAt: column.createdAt || new Date(),
      updatedAt: column.updatedAt || new Date(),
      deletedAt: column.deletedAt || null
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

    this.saveTaskOrder(); 
  }

  ngAfterViewInit(): void {
    this.saveTaskOrder();
    this.cdr.detectChanges();
  }

  saveTaskOrder() {
    const updatedColumns = this.boardTestCopy.columns;
  
    updatedColumns.forEach(column => {
      column.tasks?.forEach((task, index) => {
        this.taskFacade.updateTaskPositionAndColumn(task.id as number, index, column.id as number).subscribe({
          next: (updatedTask) => {
            console.log(`Task ${task.id} position and column updated successfully:`, updatedTask);
            task.position = index;  
            task.boardColumnId = column.id as number;  
          },
          error: (error) => {
            console.error(`Error updating task ${task.id} position and column:`, error);
          }
        });

        console.log('position:', index, 'column:', column.id, 'task:', task.id);
        
      });
    });
  
    this.cdr.detectChanges();
  }

  onTaskAdded(task: Task): void {
    const column = this.boardTestCopy.columns.find(col => col.id === task.boardColumnId);

    if (typeof(column?.tasks) === 'undefined') {
      return;
    }
    
    let columTasks = column.tasks as Task[];

    if (column) {
        this.ngZone.run(() => {
        columTasks.push(task);
        this.cdr.detectChanges();  // Ensure the change detection is triggered
      });

      this.addTaskExpansionPanel.close();
    }

    if (this.addTaskExpansionPanel && this.addTaskExpansionPanel.expanded) {
      this.addTaskExpansionPanel.close();
    }
  }
}