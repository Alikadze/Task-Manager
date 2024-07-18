import { Component, inject, OnInit } from '@angular/core';
import { EpicFacade } from '../../../core/facades/epic.facade';
import { BehaviorSubject, map, Observable, switchMap, tap, of } from 'rxjs';
import { Epic, Task } from '../../../core/interfaces/project';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskFacade } from '../../../core/facades/task.facade';
import { MatDivider } from '@angular/material/divider';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatButtonModule } from '@angular/material/button';
import { BoardFacade } from '../../../core/facades/board.facade';

@Component({
  selector: 'app-show-epic',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    DatePipe,
    MatDivider,
    NgxSkeletonLoaderModule,
    MatButtonModule
  ],
  templateUrl: './show-epic.component.html',
  styleUrl: './show-epic.component.scss'
})
export class ShowEpicComponent implements OnInit {
  epicFacade = inject(EpicFacade);
  taskFacade = inject(TaskFacade);
  boardFacade = inject(BoardFacade);
  route = inject(ActivatedRoute);
  router = inject(Router);

  epic$!: Observable<Epic>;
  tasksByEpic$!: Observable<Task[]>;
  filteredTasks$!: Observable<Task[]>;

  projectId!: number;
  boardId!: number;
  epicId!: number;

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  ngOnInit(): void {
    this.epicId = +this.route.snapshot.params['id'];

    this.epic$ = this.route.params.pipe(
      switchMap(params => {
        const epicId = +params['id'];
        return this.epicFacade.getEpic(epicId).pipe(
          tap(epic => {
            this.projectId = epic.projectId;
          }),
          switchMap(epic => {
            return this.boardFacade.getMyBoards$(this.projectId).pipe(
              tap(boards => {
                const board = boards.find(b => b.projectId === this.projectId);
                if (board) {
                  this.boardId = board.id;
                } else {
                  throw new Error('Board not found');
                }
              }),
              map(() => epic)
            );
          }),
        );
      }),
      tap(() => this.loadingSubject.next(false))
    );

    this.tasksByEpic$ = this.route.params.pipe(
      switchMap(params => {
        const epicId = +params['id'];
        return this.taskFacade.getTasksByEpicId(epicId).pipe(
          tap(tasks => {
          }),
          tap(tasks => {
            this.filteredTasks$ = of(tasks.filter(task => task.epic?.id === this.epicId));
          }),
          tap(() => this.loadingSubject.next(false))
        );
      })
    );

    this.epic$.subscribe(
      epic => {
        this.projectId = epic.projectId;
      }
    );
  }

  navigateOnBoard(boardId: number | undefined) {
    this.router.navigate([`/board/${boardId}`]);
  }

  backToWorkspace() {
    this.router.navigate([`/workspace/${this.projectId}`]);
  }
}
