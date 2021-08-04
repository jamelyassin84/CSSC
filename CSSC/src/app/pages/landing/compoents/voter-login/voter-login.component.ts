import { Voter } from './../../../../Models/User'
import { Collections } from './../../../../Models/Admin'
import { AngularFirestore } from '@angular/fire/firestore'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Alert, Welcome } from 'src/app/components/Alert'
import { ModalService } from 'src/app/services/modal.service'

@Component({
	selector: 'app-voter-login',
	templateUrl: './voter-login.component.html',
	styleUrls: ['./voter-login.component.scss'],
})
export class VoterLoginComponent implements OnInit {
	constructor(
		private router: Router,
		private firestore: AngularFirestore,
		private modal: ModalService
	) {}

	ngOnInit(): void {}

	id_number: string = ''

	login() {
		if (this.id_number === '') {
			Alert('Error', 'One or more fields should not be empty', 'error')
			return
		}
		this.firestore
			.collection(Collections.Voters, (ref) =>
				ref.where('id_number', '==', this.id_number)
			)
			.snapshotChanges()
			.subscribe((data: any[]) => {
				if (data.length === 0) {
					Alert(
						'Sorry',
						'We could not find a student associated with this ID Number',
						'error'
					)
					return
				}
				let user: Voter = data[0]
				localStorage.setItem('role', 'voter')
				localStorage.setItem('user', JSON.stringify(user))
				Welcome(
					`${user.name} ${user.campus} ${user.course} of ${user.department} Department`
				)
				this.router.navigate(['home/vote'])
				this.modal.close()
			})
	}
}
