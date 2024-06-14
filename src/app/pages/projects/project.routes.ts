import { Routes } from '@angular/router';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { AddProjectComponent } from './add-project/add-project.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: AllProjectsComponent,
  },
  {
    path: 'add',
    component: AddProjectComponent
  }
];
