import { PartylistsComponent } from './pages/home/partylists/partylists.component'
import { CandidateComponent } from './pages/home/candidate/candidate.component'
import { DashboardComponent } from './pages/home/dashboard/dashboard.component'
import { HomeIndexComponent } from './pages/home/home-index/home-index.component'
import { VoteComponent } from './pages/home/vote/vote.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LandingUiComponent } from './pages/landing/landing-ui/landing-ui.component'
import { VotesComponent } from './pages/home/votes/votes.component'

const routes: Routes = [
	{
		path: '',
		component: LandingUiComponent,
	},
	{
		path: 'vote',
		component: VoteComponent,
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
			},
			{
				path: 'administrators',
				component: PartylistsComponent,
			},
			{
				path: 'voters',
				component: VotesComponent,
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
