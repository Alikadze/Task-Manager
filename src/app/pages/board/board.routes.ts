import { Routes } from '@angular/router';
import { ShowBoardComponent } from './show-board/show-board.component';
import { AddBoardComponent } from './add-board/add-board.component';
import { RightSideComponent } from '../projects/all-projects/right-side/right-side.component';

export const homeRoutes: Routes = [
  {
    path: 'add',
    component: AddBoardComponent
  },
  {
    path: ':id',
    component: ShowBoardComponent,
  }
];
