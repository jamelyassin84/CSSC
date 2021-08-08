import { Candidate } from 'src/app/Models/Candidtate'
import { Collections } from 'src/app/Models/Admin'
import { BaseService } from 'src/app/services/base.service'
import { UserType, Voter } from './../../../../Models/User'
import { AngularFirestore } from '@angular/fire/firestore'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Alert, Welcome } from 'src/app/components/Alert'
import { ModalService } from 'src/app/services/modal.service'
import { UserService } from 'src/app/services/user.service'

@Component({
	selector: 'app-voter-login',
	templateUrl: './voter-login.component.html',
	styleUrls: ['./voter-login.component.scss'],
})
export class VoterLoginComponent implements OnInit {
	constructor(
		private router: Router,
		private firestore: AngularFirestore,
		private modal: ModalService,
		private user: UserService,
		private service: BaseService
	) {}

	ngOnInit(): void {}

	id_number: string = ''
	section: string = ''

	isLoading = false
	login() {
		if (this.id_number === '' || this.section === '') {
			Alert('Error', 'One or more fields should not be empty', 'error')
			return
		}
		this.isLoading = true
		this.firestore
			.collection(Collections.Voters, (ref) =>
				ref
					.where('id_number', '==', this.id_number)
					.where('section', '==', this.section)
			)
			.get()
			.subscribe((data: any) => {
				if (data.empty) {
					Alert(
						'Sorry',
						'We could not find a student associated with this ID Number and Section',
						'error'
					)
					this.isLoading = false
					return
				}
				data.forEach((doc: any) => {
					data = Object.assign({ id: doc.id }, doc.data())
				})
				let user: Voter | any = data
				localStorage.setItem('user', JSON.stringify(user))
				localStorage.setItem('role', UserType.Voter)
				this.firestore
					.collection(Collections.Candidate, (ref) =>
						ref.where('voter.id', '==', user.id)
					)
					.get()
					.subscribe((data: any) => {
						data.forEach(() => {
							localStorage.setItem('role', UserType.Candidate)
						})
						this.signIn(user)
					})
			})
	}

	signIn(user: any) {
		Welcome(
			`${user.name} ${user.course} ${user.section} of ${user.department} Department`
		)
		this.router.navigate(['home/vote'])
		this.modal.close()
		this.user.hasLogin()
		this.isLoading = false
	}
}
