import { Admin, AdminType } from './../../Models/Admin'
import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Alert, AuthError } from 'src/app/components/Alert'
import { AppState } from './../../app.state'
import { Store } from '@ngrx/store'
// import { BaseService } from 'src/app/services/base.service'

@Component({
	selector: 'app-add-admin',
	templateUrl: './add-admin.component.html',
	styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
	constructor(
		private auth: AngularFireAuth,
		private store: Store<AppState>
	) // private service: BaseService
	{
		this.store.select('campus').subscribe((campus) => {
			this.data.campus = campus
		})
	}

	data: Admin = {
		email: '',
		password: '',
		name: '',
		position: '',
		campus: '',
		confirm_password: '',
		type: AdminType.Admin,
	}

	save() {
		this.auth
			.createUserWithEmailAndPassword(this.data.email, this.data.password)
			.then(() => {
				// new BaseService(
				// 	this.service.firestore,
				// 	Collections.Admin,
				// 	[]
				// ).add(this.data)
				Alert(
					'Admin Creation Successfull',
					`New administrator on ${this.data.campus} campus  has been created`,
					'success'
				)
			})
			.catch((error) => {
				AuthError(error)
			})
	}

	ngOnInit(): void {}
}
export enum Collections {
	Admin = 'admins',
	Candidate = 'candidates',
	Partylisst = 'party-lists',
	Platform = 'platforms',
	Voters = 'voters',
	Votes = 'votes',
}
