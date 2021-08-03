import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LandingUiComponent } from './pages/landing/landing-ui/landing-ui.component'
import { VoterLoginComponent } from './pages/landing/compoents/voter-login/voter-login.component'
import { AdminLogInComponent } from './pages/landing/compoents/admin-log-in/admin-log-in.component'
import { ModalComponent } from './components/modal/modal.component'
import { ProgressComponent } from './components/progress/progress.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { TableComponent } from './components/table/table.component'
import { SummaryCardComponent } from './components/summary-card/summary-card.component'
import { HomeIndexComponent } from './pages/home/home-index/home-index.component'
import { CandidateComponent } from './pages/home/candidate/candidate.component'
import { PartylistsComponent } from './pages/home/partylists/partylists.component'
import { PlatformsComponent } from './pages/home/platforms/platforms.component'
import { VotesComponent } from './pages/home/votes/votes.component'
import { VoteComponent } from './pages/home/vote/vote.component'
import { NavbarComponent } from './shared/navbar/navbar.component'
import { SidebarComponent } from './shared/sidebar/sidebar.component'
import { FooterComponent } from './shared/footer/footer.component'

import { AngularFireModule } from '@angular/fire'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { DashboardComponent } from './pages/home/dashboard/dashboard.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { CampusPickerComponent } from './components/campus-picker/campus-picker.component'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms'
@NgModule({
	declarations: [
		AppComponent,
		LandingUiComponent,
		VoterLoginComponent,
		AdminLogInComponent,
		ModalComponent,
		ProgressComponent,
		SpinnerComponent,
		TableComponent,
		SummaryCardComponent,
		HomeIndexComponent,
		CandidateComponent,
		PartylistsComponent,
		PlatformsComponent,
		VotesComponent,
		VoteComponent,
		NavbarComponent,
		SidebarComponent,
		FooterComponent,
		DashboardComponent,
		CampusPickerComponent,
	],
	imports: [
		BrowserModule,
		BrowserModule,
		MatButtonModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		AngularFireModule,
		MatGridListModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatProgressBarModule,
		NgbModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatSelectModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
