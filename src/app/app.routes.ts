import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        loadChildren: () => import('../app/pages/home/home.routes').then(m => m.homeRoutes)
      },
      {
        path: 'auth',
        loadChildren: () => import('../app/pages/auth/auth.routes').then(m => m.authRoute)
      },
      {
        path: 'workspace',
        loadChildren: () => import('./pages/projects/project.routes').then(m => m.homeRoutes)
      },
      {
        path: 'board',
        loadChildren: () => import('./pages/board/board.routes').then(m => m.homeRoutes)
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];
