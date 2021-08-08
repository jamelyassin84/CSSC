import { Voter } from './../../Models/User'
import { Store } from '@ngrx/store'
import { AngularFireAuth } from '@angular/fire/auth'
import { Component, Input, OnInit } from '@angular/core'
import { AppState } from 'src/app/store/app.state'
import { BaseService } from 'src/app/services/base.service'
import { Candidate } from 'src/app/Models/Candidtate'
import { Alert, Fire } from 'src/app/components/Alert'
import { Collections } from 'src/app/Models/Admin'
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs'
import { positions } from 'src/app/constants/AppConstants'

@Component({
	selector: 'app-add-member',
	templateUrl: './add-member.component.html',
	styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
	constructor(
		private auth: AngularFireAuth,
		private service: BaseService,
		private store: Store<AppState>,
		private storage: AngularFireStorage
	) {}

	@Input() partylist = ''
	positions = positions
	voters: Voter[] | any = []
	data: Candidate | any = {
		partylist: '',
		position: '',
		voter: {},
	}

	ngOnInit(): void {
		this.getVoters()
	}

	getVoters() {
		new BaseService(
			this.service.firestore,
			Collections.Voters,
			[],
			this.service.store
		)
			.fetchAll()
			.subscribe((voters) => (this.voters = voters))
	}

	handleSelectOnChange(event: any) {
		const index = event.target.value
		this.data.voter = this.voters[index]
	}

	image: any = '../../../assets/avatar/face-7.jpg'
	file: any
	readURL(event: any) {
		this.file = event.target.files.item(0)
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader()
			reader.readAsDataURL(event.target.files[0])
			reader.onload = (event: any) => {
				this.image = event.target.result
			}
		}
	}

	uploadPercent: number | any = 0
	downloadURL: Observable<string> | any
	isLoading = false

	save() {
		this.data.partylist = this.partylist
		console.log(this.data)
		for (let key in this.data) {
			if (this.data[key] !== 'photo' && this.data[key] === '') {
				return Alert(
					'Error',
					`One or more fields should not be empty.`,
					'error'
				)
			}
		}
		Fire(
			`Register ${this.data.name}?`,
			`Are you sure you want to add   ${this.data.voter.name} in ${this.partylist} Partylist?`,
			'info',
			async () => {
				this.isLoading = true
				if (this.file !== undefined) {
					let file = await this.storage
						.ref('avatars/' + this.file.name)
						.put(this.file)
					this.data.photo = await file.ref.getDownloadURL()
				}
				new BaseService(
					this.service.firestore,
					Collections.Candidate,
					[],
					this.store
				).add(this.data)
				Alert(
					`${this.data.voter.name} has been successfully registered`,
					`New Member has been add to ${this.partylist} Partylist`,
					'success'
				)
				this.isLoading = false
			}
		)
	}
}
