import { Component, OnInit, inject } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ProjectFacade } from '../../../../core/facades/project.facade';
import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Board, Epic, ProjectResponse } from '../../../../core/interfaces/project';
import { BoardService } from '../../../../core/services/board.service';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BoardFacade } from '../../../../core/facades/board.facade';
import { StorageService } from '../../../../core/services/storage.service';
import { EpicFacade } from '../../../../core/facades/epic.facade';

const DASHBOARD =
  `
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
`;

const EPIC =
`
<svg width="900px" height="900px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 12H21M13 8H21M13 16H21M6 7V17M6 7L3 10M6 7L9 10" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

@Component({
  selector: 'app-right-side',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgIf,
    NgFor,
    MatDivider,
    DatePipe,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './right-side.component.html',
  styleUrl: './right-side.component.scss'
})
export class RightSideComponent implements OnInit {
  projectFacade = inject(ProjectFacade);
  boardService = inject(BoardService);
  storageService = inject(StorageService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  epicFacade = inject(EpicFacade);

  project$!: Observable<ProjectResponse>;
  boards$!: Observable<Board[]>;

  epics$!: Observable<Epic[]>;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('dashboard', sanitizer.bypassSecurityTrustHtml(DASHBOARD));
    iconRegistry.addSvgIconLiteral('epic', sanitizer.bypassSecurityTrustHtml(EPIC));
  }

  ngOnInit(): void {
    this.project$ = this.route.params.pipe(
      switchMap(params => {
        const projectId = params['id'];
        this.projectFacade.setProjectId(projectId);
        return this.projectFacade.getProjectById(projectId);
      })
    );

    this.boards$ = this.route.params.pipe(
      switchMap(params => {
        const projectId = +params['id'];
        this.storageService.setItem('projectId', projectId);
        return this.boardService.getBoards(projectId);
      })
    );

    this.epics$ = this.route.params.pipe(
      switchMap(() => {
        return this.epicFacade.getEpics();
      })
    )
  }

  naviageToAddBoard () {
    this.router.navigate([`/board/add`]);
    window.scrollTo(0,0)
  }

  navigateToBoard(boardId: number): void {
    this.router.navigate([`board/${boardId}`]);
    window.scrollTo(0,0)
  }

  naviageToAddEpic() {
    this.router.navigate([`/epic/add`]);
    window.scrollTo(0,0)
  }

  navigateToEpic(id: number): void {
    this.router.navigate([`/epic/${id}`]);
    window.scrollTo(0,0)
  }
}
