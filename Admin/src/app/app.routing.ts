import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';
import { CandidatesComponent } from './pages/home/candidates/candidates.component';
import { VoteComponent } from './pages/home/vote/vote.component';
import { VotersComponent } from './pages/home/voters/voters.component';
import { OrdersComponent } from './pages/home/orders/orders.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component:LoginComponent
    },
    {
        path: 'home',
        component: DefaultLayoutComponent,
        data: {title: 'Home' },
        children: [ 
            {
                path: 'dashboard',
                component:DashboardComponent,
                data: {title: 'Home / Dashboard' },
            },
            {
                path: 'voters',
                component:VotersComponent,
                data: {title: 'Home / Voters' },
            },
            {
                path: 'candidates',
                component:CandidatesComponent,
                data: {title: 'Home / Candidates' },
            },
            {
                path: 'ordering',
                component:OrdersComponent,
                data: {title: 'Home / Ordering' },
            },
            {
                path: 'vote',
                component:VoteComponent,
                data: {title: 'Home / Vote' },
            },
        ]
    },
    { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
