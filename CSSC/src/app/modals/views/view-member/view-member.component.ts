import { UserService } from './../../../services/user.service'
import { Collections } from '../../../Models/Admin'
import { Component, Input, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'
import { Candidate } from 'src/app/Models/Candidtate'
import { BaseService } from 'src/app/services/base.service'
import {
	resolvePosition,
	sortCandidatesByPosition,
} from 'src/app/constants/app.helpers'

@Component({
	selector: 'app-view-member',
	templateUrl: './view-member.component.html',
	styleUrls: ['./view-member.component.scss'],
})
export class ViewMemberComponent implements OnInit {
	constructor(private service: BaseService, private user: UserService) {}
	@Input() partylist: string | any = ''
	ngOnInit(): void {
		this.getCandidates()
	}

	isAdmin = this.user.isAdmin()
	candidates: Candidate[] | any = []

	getCandidates() {
		setTimeout(() => {
			this.service.firestore
				.collection(Collections.Candidate, (ref) =>
					ref.where('partylist', '==', this.partylist)
				)
				.valueChanges({ idField: 'id' })
				.subscribe((candidates: Candidate[] | any) => {
					this.candidates = sortCandidatesByPosition(candidates)
				})
		}, 500)
	}

	remove(id: string | any) {
		Fire(
			'Remove Data',
			'Are you sure you want to remove this data?',
			'info',
			() => {
				new BaseService(
					this.service.firestore,
					Collections.Candidate,
					[],
					this.service.store
				).remove(id)
			}
		)
	}

	voter_id: string | any = ''
	setVoterId(id: string | any) {
		this.voter_id = id
	}

	resolvePosition(candidate: Candidate) {
		return resolvePosition(candidate)
	}
}
