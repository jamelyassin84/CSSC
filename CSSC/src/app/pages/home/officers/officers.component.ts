import { Candidate } from './../../../Models/Candidtate'
import { Collections } from './../../../Models/Admin'
import { BaseService } from './../../../services/base.service'
import { Component, OnInit } from '@angular/core'
import { LineUpType } from 'src/app/Models/LineUp'
import { sortBy } from 'src/app/constants/helpers'

@Component({
	selector: 'app-officers',
	templateUrl: './officers.component.html',
	styleUrls: ['./officers.component.scss'],
})
export class OfficersComponent implements OnInit {
	constructor(private service: BaseService) {}

	candidates: Candidate[] = []
	departments: any[] = []

	ngOnInit(): void {
		this.service.firestore
			.collection(Collections.Votes)
			.valueChanges()
			.subscribe(() => {
				this.onRefresh()
			})
	}

	onRefresh = async () => {
		this.getDepartments()
		this.getCandidates()
	}

	getCandidates = () => {
		let temp: Candidate[] = []
		this.service.firestore
			.collection(Collections.Candidate)
			.get()
			.subscribe((snapShot) => {
				snapShot.forEach((candidate: any) => {
					temp.push(
						Object.assign(candidate.data(), {
							id: candidate.id,
						})
					)
				})
				this.processVotes(temp)
			})
	}

	processVotes = (candidatesData: any[]) => {
		this.service.firestore
			.collection(Collections.Votes)
			.get()
			.subscribe((snapshot: any) => {
				let temp: any = []
				snapshot.forEach((doc: any) => {
					temp.push(Object.assign(doc.data(), { id: doc.id }))
				})
				const votes: VoteType[] = temp
				for (let index in candidatesData) {
					candidatesData[index].votes = 0
					votes.forEach((vote: VoteType) => {
						vote.bets.forEach((candidate_id: string) => {
							if (candidate_id === candidatesData[index].id) {
								candidatesData[index].votes += 1
							}
						})
					})
				}
				this.processCandidates(
					sortBy(candidatesData, 'position', 'ASC', 'string', false)
				)
			})
	}

	processCandidates = (candidatesData: any[]) => {
		this.candidates = []
		let president: any = {}
		let vp: any = {}
		let senators: any[] = []
		let govs: any[] = []
		let reps: any[] = []
		candidatesData.forEach((candidate: any) => {
			if (candidate.position === LineUpType.President) {
				if (
					candidate.votes > president.votes ||
					president.votes === undefined
				) {
					president = candidate
				}
			}
			if (candidate.position === LineUpType.VP) {
				if (candidate.votes > vp.votes || vp.votes === undefined) {
					vp = candidate
				}
			}
			if (candidate.position === LineUpType.Senator) {
				senators.push(candidate)
			}
			if (candidate.position === LineUpType.Governor) {
				govs.push(candidate)
			}
			if (candidate.position === LineUpType.Representative) {
				reps.push(candidate)
			}
		})
		senators = senators.sort((a: any, b: any) => a.votes + b.votes)
		senators = senators.filter((candidate) => candidate.votes !== 0)
		senators = senators.filter((candidate, idx) => idx < 12)

		this.candidates = [
			...[],
			president,
			vp,
			...senators,
			...sortBy(govs, 'department', 'ASC', 'string', true),
			...sortBy(reps, 'department', 'ASC', 'string', true),
		]
	}

	getDepartments = () => {
		this.departments = []
		this.service.firestore
			.collection(Collections.Voters)
			.get()
			.subscribe((snapshot) => {
				let departments: string[] = []
				snapshot.forEach((doc: any) => {
					if (!departments.includes(doc.data()['department'])) {
						departments.push(doc.data()['department'])
					}
				})
				this.departments = departments
			})
	}
}

export type VoteType = {
	bets: any[]
	voter: string
}
