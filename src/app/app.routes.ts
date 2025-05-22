import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    // {
    //     path: 'auth',
    //     loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
    // },
    //  {
    //   path: 'dashboard',
    //   canActivate: [authGuard],
    //   loadChildren: () => import('./features/dashbaord/dashbaord.component').then(m => m.DashboardModule),
    // },
    // {
    //   path: 'admin',
    //   canActivate: [permissionsGuard],
    //   data: { permissions: ['can_access_admin'] },
    //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    // }
  // other routes...
];
