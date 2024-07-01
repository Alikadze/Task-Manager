import { Component, OnInit, inject } from '@angular/core';
import { BoardFacade } from '../../../../../core/facades/board.facade';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { ProjectFacade } from '../../../../../core/facades/project.facade';
import { Observable } from 'rxjs';
import { Board } from '../../../../../core/interfaces/project';

@Component({
  selector: 'app-sidebar-boards',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    CommonModule,
  ],
  templateUrl: './sidebar-boards.component.html',
  styleUrl: './sidebar-boards.component.scss',
})
export class SidebarBoardsComponent implements OnInit {
  boardFacade = inject(BoardFacade);
  projectFacade = inject(ProjectFacade);

  projectId = this.projectFacade.getProjectId();

  boards$!: Observable<Board[]>; 

  selectedBoardId: number | null = null;

  ngOnInit(): void {
    this.boards$ = this.boardFacade.getMyBoards$(this.projectId);   
  }

  selectBoard(boardId: number): void {
    this.selectedBoardId = boardId;
  }
}
