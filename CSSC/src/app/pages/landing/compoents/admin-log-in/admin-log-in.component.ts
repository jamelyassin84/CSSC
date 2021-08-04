import { AngularFirestore } from '@angular/fire/firestore'
import { AdminType, Collections } from './../../../../Models/Admin'
import { ModalService } from './../../../../services/modal.service'
import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { Alert, AuthError, Welcome } from 'src/app/components/Alert'
import { BaseService } from 'src/app/services/base.service'

@Component({
	selector: 'app-admin-log-in',
	templateUrl: './admin-log-in.component.html',
	styleUrls: ['./admin-log-in.component.scss'],
})
export class AdminLogInComponent implements OnInit {
	constructor(
		private router: Router,
		private auth: AngularFireAuth,
		private modal: ModalService,
		private service: BaseService
	) {}

	ngOnInit(): void {}

	data: any = {
		email: '',
		password: '',
	}

	login() {
		if (this.data.email === '' || this.data.password === '') {
			Alert('Error', 'One or more fields should not be empty', 'error')
			return
		}
		this.auth
			.signInWithEmailAndPassword(this.data.email, this.data.password)
			.then(() => {
				this.service.firestore
					.collection(Collections.Admin, (ref) =>
						ref
							.where('email', '==', this.data.email)
							.where('password', '==', this.data.password)
					)
					.valueChanges()
					.subscribe((data: any[]) => {
						if (data.length === 0) {
							localStorage.setItem('role', AdminType.SuperAdmin)
							Welcome('CSSC System Super Administrator')
						}
						if (data.length !== 0) {
							localStorage.setItem('role', AdminType.Admin)
							localStorage.setItem(
								'user',
								JSON.stringify(data[0])
							)
							Welcome(
								`Admin ${data[0].name} (${data[0].position})`
							)
						}
					})
				this.router.navigate(['home/dashboard'])
				this.modal.close()
			})
			.catch((error) => {
				AuthError(error)
			})
	}
}
