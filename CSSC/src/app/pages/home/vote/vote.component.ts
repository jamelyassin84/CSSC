import { LineUpType } from './../../../Models/LineUp'
import { Component, OnInit } from '@angular/core'
import { Collections } from 'src/app/Models/Admin'
import { Candidate } from 'src/app/Models/Candidtate'

import { BaseService } from 'src/app/services/base.service'
import { ReloadService } from 'src/app/services/reload.service'

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
	senators: Candidate[] = []

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
				})
			})
	}

	clearCandidates() {
		this.presidents = []
		this.vps = []
		this.senators = []
	}
}
