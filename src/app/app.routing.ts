import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P405Component } from './views/error/405.component';
import { P500Component } from './views/error/500.component';
import { P403Component } from './views/error/p403.component';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Right, Role } from './utils/consts/const';
import { P505Component } from './views/error/p505/p505.component';
import { environment } from '~/environments/environment';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '405',
    component: P405Component,
    data: {
      title: 'Page 405',
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: '403',
    component: P403Component,
    data: {
      title: 'Page 403',
    },
  },
  {
    path: '505',
    component: P505Component,
    data: {
      title: 'Page 505',
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'SYSTEM_MANAGEMENT',
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: environment.APP_CODE,
        },
      },
    ],
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: false }),
    BsDropdownModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
