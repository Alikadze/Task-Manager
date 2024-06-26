import { Component, OnInit, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ProjectFacade } from '../../../../core/facades/project.facade';
import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Board, ProjectResponse } from '../../../../core/interfaces/project';
import { BoardService } from '../../../../core/services/board.service';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BoardFacade } from '../../../../core/facades/board.facade';

const DASHBOARD =
  `
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
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
  route = inject(ActivatedRoute);
  router = inject(Router);

  project$!: Observable<ProjectResponse>;
  boards$!: Observable<Board[]>;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('dashboard', sanitizer.bypassSecurityTrustHtml(DASHBOARD));
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
        return this.boardService.getBoards(projectId);
      })
    );
  }

  naviageOnAddBoard () {
    const projectId = this.route.snapshot.params['id']; // Get project ID from route
    this.router.navigate([`/board/add`]);
  }
}
