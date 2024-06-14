import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ProjectFacade } from '../../../core/facades/project.facade';
import { ProjectColorService } from '../../../core/services/project-color.service';

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.scss'
})
export class AllProjectsComponent implements OnInit{
  authFacade = inject(AuthFacade);
  projectFacade = inject(ProjectFacade);
  projectColorService = inject(ProjectColorService)
  
  user = this.authFacade.user

  allProjetcs$ = this.projectFacade.getMyProjects$();

  projectBgColor?: string;



  ngOnInit(): void {
    this.projectColorService.getProjectBgColor().subscribe((color) => {
      this.projectBgColor = color;
    });
  } 
}
