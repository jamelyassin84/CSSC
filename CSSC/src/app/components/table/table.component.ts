import { Collections } from 'src/app/Models/Admin'
import { Component, Input, OnInit } from '@angular/core'
import { BaseService } from 'src/app/services/base.service'
import { Candidate } from 'src/app/Models/Candidtate'

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
	constructor(private service: BaseService) {}
	@Input() header: string = ''
	@Input() voters: number = 0

	ngOnInit(): void {
		setTimeout(() => {
			this.getCandidates()
		}, 500)
	}

	candidates: any = []

	getCandidates() {
		this.service.firestore
			.collection(Collections.Candidate, (ref) => ref.where('partylist', '==', this.header))
			.valueChanges({ idField: 'id' })
			.subscribe((data: any) => {
				this.candidates = data
				this.processVotes()
			})
	}

	processVotes() {
		this.service.firestore
			.collection(Collections.Votes)
			.valueChanges()
			.subscribe((data: any) => {
				const votes: VoteType[] = data
				for (let index in this.candidates) {
					this.candidates[index].votes = 0
					votes.forEach((vote: VoteType) => {
						vote.bets.forEach((candidate_id: string) => {
							if (candidate_id === this.candidates[index].id) {
								this.candidates[index].votes += 1
							}
						})
					})
				}
			})
	}

	percentOf(x: number | any, y: number | any) {
		return (parseFloat(x) * 100) / parseFloat(y)
	}
}

type VoteType = {
	bets: any[]
	voter: string
}
