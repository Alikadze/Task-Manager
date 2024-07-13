import { Routes } from '@angular/router';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { RightSideComponent } from './all-projects/right-side/right-side.component';

export const workspaceRoutes: Routes = [
  {
    path: 'add',
    component: AddProjectComponent
  },
  {
    path: '',
    component: AllProjectsComponent,
    children: [
      {
        path: ':id',
        component: RightSideComponent,
      },
    ]
  },
  
];
