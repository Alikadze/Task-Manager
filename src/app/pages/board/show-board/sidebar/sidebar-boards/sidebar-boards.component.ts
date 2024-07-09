import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { BoardFacade } from '../../../../../core/facades/board.facade';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { ProjectFacade } from '../../../../../core/facades/project.facade';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Board } from '../../../../../core/interfaces/project';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
  
@Component({
  selector: 'app-sidebar-boards',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './sidebar-boards.component.html',
  styleUrls: ['./sidebar-boards.component.scss'],
})
export class SidebarBoardsComponent implements OnInit {
  boardFacade = inject(BoardFacade);
  projectFacade = inject(ProjectFacade);
  router = inject(Router);
  route = inject(ActivatedRoute);

  projectId = this.projectFacade.getProjectId();

  boards$!: Observable<Board[]>; 

  selectedBoardId: number | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedBoardId = Number(params.get('id'));
    });

    this.boards$ = this.boardFacade.getMyBoards$(this.projectId);   
  }

  navigateToBoard(selectBoard: number): void {
    this.router.navigate([`/board/${selectBoard}`]);
  }
}
