import { Admin, AdminType, Collections } from '../../../Models/Admin'
import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Alert, AuthError, Fire } from 'src/app/components/Alert'
import { AppState } from '../../../store/app.state'
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

	data: Admin | any = {
		email: '',
		password: '',
		name: '',
		position: '',
		campus: '',
		confirm_password: '',
		type: AdminType.Admin,
	}
	isLoading = false
	save() {
		for (let key in this.data) {
			if (this.data[key] === '') {
				return Alert(
					'Error',
					`One or more fields should not be empty`,
					'error'
				)
			}
		}
		Fire(
			'Add an Administrator',
			'Are you sure you want to add this administrator?',
			'info',
			() => {
				this.isLoading = true
				this.auth
					.createUserWithEmailAndPassword(
						this.data.email || '',
						this.data.password || ''
					)
					.then(() => {
						for (let key in this.data) {
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
						this.isLoading = false
						Alert(
							'Admin Creation Successfull',
							`New administrator on ${this.data.campus} campus  has been created`,
							'success'
						)
					})
					.catch((error) => {
						AuthError(error)
						this.isLoading = false
					})
			}
		)
	}

	ngOnInit(): void {}
}
