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
        component: HomeComponent
      },
      {
        path: 'auth',
        loadChildren: () => import('../app/pages/auth/auth.routes').then(m => m.authRoute)
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];
