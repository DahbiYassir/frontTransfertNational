import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';

export const Approutes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
},
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
