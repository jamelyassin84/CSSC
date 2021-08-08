import { LineUpType } from './../../../Models/LineUp'
import { Component, OnInit } from '@angular/core'
import { Collections } from 'src/app/Models/Admin'
import { Candidate } from 'src/app/Models/Candidtate'

import { BaseService } from 'src/app/services/base.service'
import { ReloadService } from 'src/app/services/reload.service'
import { groupBy } from 'src/app/constants/helpers'

@Component({
	selector: 'app-vote',
	templateUrl: './vote.component.html',
	styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
	constructor(
		private service: BaseService,
		private component: ReloadService
	) {}

	ngOnInit(): void {
		this.getCandidates()
	}

	candidates: Candidate[] = []

	presidents: Candidate[] = []
	vps: Candidate[] = []
	senators: any = []
	govs: any = []
	reps: any = []
	mayors: any = []

	getCandidates() {
		this.service.firestore
			.collection(Collections.Candidate)
			.valueChanges({ idField: 'id' })
			.subscribe((candidates: Candidate[] | any) => {
				this.clearCandidates()
				candidates.forEach((candidate: Candidate) => {
					if (candidate.position === LineUpType.President) {
						this.presidents.push(candidate)
					}
					if (candidate.position === LineUpType.VP) {
						this.vps.push(candidate)
					}
					if (candidate.position === LineUpType.Senator) {
						this.senators.push(candidate)
					}
					if (candidate.position === LineUpType.Governor) {
						this.govs.push(candidate)
					}
					if (candidate.position === LineUpType.Representative) {
						this.reps.push(candidate)
					}
				})
				this.senators = groupBy(this.senators, 'partylist')
				this.govs = groupBy(this.govs, 'partylist')
				this.reps = groupBy(this.reps, 'partylist')
				this.mayors = groupBy(this.reps, 'partylist')
			})
	}

	clearCandidates() {
		this.presidents = []
		this.vps = []
		this.senators = []
	}

	votes: string[] | any = []

	vote(id: string | any, position: string, name: string) {
		this.votes.push({ candidate_id: id, position: position })
		this.voteIds[name.toString()] =
			this.voteIds[name.toString()] === false ||
			this.voteIds[name.toString()] === undefined
				? true
				: false
	}

	voteIds: any = {}

	submitVote() {}
}
