import { Component, OnInit, inject } from '@angular/core';
import { ProjectFacade } from '../../../../../core/facades/project.facade';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {
  projectFacade = inject(ProjectFacade);
  router = inject(Router);


  projectId = this.projectFacade.getProjectId();
  project$ = this.projectFacade.getProjectById(this.projectId);

  goToWorkspace() { 
    this.router.navigate([`/workspace/${this.projectId}`]);
  }

}
