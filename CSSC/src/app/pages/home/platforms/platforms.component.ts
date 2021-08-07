import { Candidate } from 'src/app/Models/Candidtate'
import { Collections } from 'src/app/Models/Admin'
import { Platform } from './../../../Models/Platform'
import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service'
import { BaseService } from 'src/app/services/base.service'

@Component({
	selector: 'app-platforms',
	templateUrl: './platforms.component.html',
	styleUrls: ['./platforms.component.scss'],
})
export class PlatformsComponent implements OnInit {
	constructor(private user: UserService, private service: BaseService) {}

	platform: Platform | any = {}
	candidate: Candidate | any = {}

	ngOnInit(): void {
		this.getPlatform()
		this.getCandidate()
	}

	getCandidate() {
		this.service.firestore
			.collection(Collections.Candidate, (ref) =>
				ref.where('voter.id', '==', this.user.id())
			)
			.valueChanges()
			.subscribe((candidate: Candidate | any) => {
				candidate.forEach((element: any) => {
					console.log(element)
					this.candidate = element
				})
			})
	}

	getPlatform() {
		this.service.firestore
			.collection(Collections.Platform, (ref) =>
				ref.where('candidate_id', '==', this.user.id())
			)
			.valueChanges({ idField: 'id' })
			.subscribe((platform: Platform | any) => {
				platform.forEach((element: any) => {
					this.platform = element
				})
			})
	}
}
