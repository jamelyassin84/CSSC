import { Admin, AdminType, Collections } from './../../Models/Admin'
import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Alert, AuthError, Fire } from 'src/app/components/Alert'
import { AppState } from './../../app.state'
import { Store } from '@ngrx/store'
import { BaseService } from 'src/app/services/base.service'

@Component({
	selector: 'app-add-admin',
	templateUrl: './add-admin.component.html',
	styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
	constructor(
		private auth: AngularFireAuth,
		private store: Store<AppState>,
		private service: BaseService
	) {
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
		Fire(
			'Add an Administrator',
			'Are you sure you want to add this administrator?',
			'info',
			() => {
				this.auth
					.createUserWithEmailAndPassword(
						this.data.email || '',
						this.data.password || ''
					)
					.then(() => {
						for (let key in this.data) {
							key === 'email' ||
							key === 'password' ||
							key === 'confirm_password'
								? delete this.data[key]
								: ''
						}
						new BaseService(
							this.service.firestore,
							Collections.Admin,
							[],
							this.store
						).add(this.data)
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
		)
	}

	ngOnInit(): void {}
}
