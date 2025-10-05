import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { environment } from '~/environments/environment';
import { DefaultLayoutComponent } from './containers';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { P404Component } from './views/error/404.component';
import { P405Component } from './views/error/405.component';
import { P500Component } from './views/error/500.component';
import { P403Component } from './views/error/p403.component';
import { P505Component } from './views/error/p505/p505.component';
import { TemperatureComponent } from './views/components/qc1qc2/temperature/temperature.component';

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
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: environment.APP_CODE,
        },
      },
    ],
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'QUALITY_CONTROL',
    },
    children: [
      {
        path: 'qc1',
        data: { title: 'QUALITY_QC1' },
        children: [
          {
            path: 'temperature',
            component: TemperatureComponent,
            data: { title: 'TEMPERATURE' },
          },
        ],
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
