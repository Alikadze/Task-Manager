import { Component, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren, inject, signal, viewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFacade } from '../../../../core/facades/auth.facade';
import { ProjectFacade } from '../../../../core/facades/project.facade';
import { ProjectColorService } from '../../../../core/services/project-color.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-left-side',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatExpansionModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './left-side.component.html',
  styleUrl: './left-side.component.scss'
})
export class LeftSideComponent implements OnInit {
  @Output() projectSelected = new EventEmitter<any>();
  
  authFacade = inject(AuthFacade);
  projectFacade = inject(ProjectFacade);
  projectColorService = inject(ProjectColorService);
  router = inject(Router)
  
  color = this.projectFacade.themeColor

  allProjetcs$ = this.projectFacade.getMyProjects$();

  projectBgColor?: string;

  uniqueColors$!: Observable<string[]>;

  @ViewChildren('addTaskExpansionPanel') addTaskExpansionPanels!: QueryList<MatExpansionPanel>;


  selectProject(project: any, panel: MatExpansionPanel) {
    this.router.navigate(['/workspace', project.id]).then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    panel.close();
  }

  ngOnInit(): void {
    this.projectBgColor = this.color
    this.uniqueColors$ = this.projectFacade.getUniqueColors();
  } 

  readonly panelOpenState = signal(false);
}
