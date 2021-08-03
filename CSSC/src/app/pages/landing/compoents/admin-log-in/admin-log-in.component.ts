import { ModalService } from './../../../../services/modal.service'
import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { Alert, Welcome } from 'src/app/components/Alert'

@Component({
	selector: 'app-admin-log-in',
	templateUrl: './admin-log-in.component.html',
	styleUrls: ['./admin-log-in.component.scss'],
})
export class AdminLogInComponent implements OnInit {
	constructor(
		private router: Router,
		private auth: AngularFireAuth,
		private modal: ModalService
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
			.then((data) => {
				console.log(data)
				this.router.navigate(['home/dashboard'])
				Welcome('Welcome CSSC Super Administrator')
				this.modal.close()
			})
			.catch((error) => {
				Alert(error.code, error.message, 'error')
			})
	}
}
