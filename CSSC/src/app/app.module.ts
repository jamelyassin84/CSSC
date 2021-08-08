import { CandidateGuard } from './guards/candidate.guard'
import { VoterGuardGuard } from './guards/voter-guard.guard'
import { AdminGuard } from './guards/admin.guard'
import { environment } from './../environments/environment.prod'
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
import { VotesComponent } from './pages/home/voters/votes.component'
import { VoteComponent } from './pages/home/vote/vote.component'
import { NavbarComponent } from './shared/navbar/navbar.component'
import { SidebarComponent } from './shared/sidebar/sidebar.component'
import { FooterComponent } from './shared/footer/footer.component'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'

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
import { AdminComponent } from './pages/home/admin/admin.component'
import { DropdownComponent } from './components/dropdown/dropdown.component'
import { StoreModule } from '@ngrx/store'
import { CampusReducer } from './store/reducers/campus.reducers'
import { AddAdminComponent } from './modals/add-admin/add-admin.component'
import { AddVoterComponent } from './modals/add-voter/add-voter.component'
import { AddPartyListComponent } from './modals/add-party-list/add-party-list.component'
import { AddMemberComponent } from './modals/add-member/add-member.component'
import { ViewMemberComponent } from './modals/view-member/view-member.component'
import { TextareaAutosizeModule } from 'ngx-textarea-autosize'
import { NoInternetComponent } from './pages/no-internet/no-internet.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component'
import { SuperAdminGuard } from './guards/super-admin.guard'
import { AddPlatformComponent } from './modals/add-platform/add-platform.component'
import { ViewPlatformComponent } from './modals/view-platform/view-platform.component'
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component'

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
		AdminComponent,
		DropdownComponent,
		AddAdminComponent,
		AddVoterComponent,
		AddPartyListComponent,
		AddMemberComponent,
		ViewMemberComponent,
		NoInternetComponent,
		NotFoundComponent,
		NotAuthorizedComponent,
		AddPlatformComponent,
		ViewPlatformComponent,
		CandidateCardComponent,
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
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatSelectModule,
		FormsModule,
		NgbModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFireStorageModule,
		AngularFirestoreModule,
		TextareaAutosizeModule,
		StoreModule.forRoot({ campus: CampusReducer }),
	],
	providers: [AdminGuard, SuperAdminGuard, VoterGuardGuard, CandidateGuard],
	bootstrap: [AppComponent],
})
export class AppModule {}
