import { Component, OnInit, inject } from '@angular/core';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { ProjectFacade } from '../../../core/facades/project.facade';
import { ProjectColorService } from '../../../core/services/project-color.service';
import { Observable, filter } from 'rxjs';
import { LeftSideComponent } from './left-side/left-side.component';
import { RightSideComponent } from './right-side/right-side.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-projects',
  standalone: true,
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.scss',
  imports: [
    JsonPipe,
    AsyncPipe, 
    NgFor, 
    LeftSideComponent, 
    RightSideComponent,
    RouterOutlet
  ],
})
export class AllProjectsComponent {
  selectedProject: any;
  
  router = inject(Router);
  route = inject(ActivatedRoute);

  onProjectSelected(project: any) {
    this.selectedProject = project;
  }
}
