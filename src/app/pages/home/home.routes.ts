import { Routes } from '@angular/router';
import { AutomateComponent } from './automate/automate.component';
import { CollaborateComponent } from './collaborate/collaborate.component';
import { TransformComponent } from './transform/transform.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: AutomateComponent,
  },
  {
    path: 'collaborate',
    component: CollaborateComponent
  },
  {
    path: 'transform',
    component: TransformComponent
  }
];
