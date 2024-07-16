import { Routes } from '@angular/router';
import { AddEpicComponent } from './add-epic/add-epic.component';
import { ShowEpicComponent } from './show-epic/show-epic.component';
export const epicRoutes: Routes = [
  {
    path: 'add',
    component: AddEpicComponent
  },
  {
    path: ':id',
    component: ShowEpicComponent,
  }
];
