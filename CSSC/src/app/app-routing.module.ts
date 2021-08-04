import { VoterGuardGuard } from './guards/voter-guard.guard'
import { AdminGuard } from './guards/admin.guard'
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { NoInternetComponent } from './pages/no-internet/no-internet.component'
import { AdminComponent } from './pages/home/admin/admin.component'
import { PartylistsComponent } from './pages/home/partylists/partylists.component'
import { DashboardComponent } from './pages/home/dashboard/dashboard.component'
import { HomeIndexComponent } from './pages/home/home-index/home-index.component'
import { VoteComponent } from './pages/home/vote/vote.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LandingUiComponent } from './pages/landing/landing-ui/landing-ui.component'
import { VotesComponent } from './pages/home/votes/votes.component'
import { SuperAdminGuard } from './guards/super-admin.guard'

const routes: Routes = [
	{
		path: '',
		component: LandingUiComponent,
	},
	{
		path: 'home',
		component: HomeIndexComponent,
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent,
			},
			{
				path: 'party-lists',
				component: PartylistsComponent,
				canActivate: [AdminGuard],
			},
			{
				path: 'administrators',
				component: AdminComponent,
				canActivate: [SuperAdminGuard],
			},
			{
				path: 'voters',
				component: VotesComponent,
				canActivate: [AdminGuard],
			},
			{
				path: 'vote',
				component: VoteComponent,
				canActivate: [VoterGuardGuard],
			},
		],
	},
	{
		path: 'no-internet',
		component: NoInternetComponent,
	},
	{
		path: 'not-authorized',
		component: NotAuthorizedComponent,
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
