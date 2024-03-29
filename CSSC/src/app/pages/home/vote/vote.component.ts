import { BaseService } from './../../../services/base.service'
import { LineUpType } from './../../../Models/LineUp'
import { Component, OnInit } from '@angular/core'
import { Collections } from 'src/app/Models/Admin'
import { Candidate } from 'src/app/Models/Candidtate'
import { dataExist, groupBy, sortBy } from 'src/app/constants/helpers'
import { Alert, Fire } from 'src/app/components/Alert'
import { UserService } from 'src/app/services/user.service'
import { filterByStudent } from 'src/app/constants/app.helpers'

@Component({
	selector: 'app-vote',
	templateUrl: './vote.component.html',
	styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
	constructor(private service: BaseService, private user: UserService) {}

	hasVoted = false
	ngOnInit(): void {
		this.checkIfHasVoted()
		setTimeout(() => {
			if (!this.hasVoted) {
				this.getCandidates()
			}
		}, 500)
	}
	isLoading = true
	checkIfHasVoted() {
		this.service.firestore
			.collection(Collections.Votes, (ref) =>
				ref.where('voter', '==', this.user.id())
			)
			.valueChanges()
			.subscribe((voted: any) => {
				this.isLoading = false
				this.hasVoted = voted.length !== 0 ? true : false
			})
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
				this.presidents = sortBy(
					filterByStudent(this.presidents, LineUpType.President),
					'name',
					'ASC',
					'string',
					true
				)
				this.vps = sortBy(
					filterByStudent(this.vps, LineUpType.VP),
					'name',
					'ASC',
					'string',
					true
				)
				this.senators = groupBy(
					sortBy(
						filterByStudent(this.senators, LineUpType.VP),
						'name',
						'ASC',
						'string',
						true
					),
					'partylist'
				)
				this.govs = groupBy(
					filterByStudent(
						sortBy(this.govs, 'department', 'ASC', 'string', true),
						LineUpType.Governor
					),
					'partylist'
				)
				this.reps = groupBy(
					filterByStudent(
						sortBy(this.reps, 'year', 'ASC', 'string', true),
						LineUpType.Governor
					),
					'partylist'
				)
			})
	}

	clearCandidates() {
		this.presidents = []
		this.vps = []
		this.senators = []
	}

	votes: string[] | any = []
	vote(candidate: Candidate) {
		if (
			candidate.position === LineUpType.President ||
			candidate.position === LineUpType.VP
		) {
			if (
				dataExist(candidate, this.votes, 'position', false) &&
				!this.existInVotes(candidate)
			) {
				return this.warningAlert(1)
			}
		}
		if (candidate.position === LineUpType.Senator) {
			if (
				this.position_is_in_votes(candidate) === 12 &&
				!this.existInVotes(candidate)
			) {
				return this.warningAlert(12)
			}
		}
		if (candidate.position === LineUpType.Governor) {
			if (
				dataExist(candidate, this.votes, 'position', false) &&
				this.departmentExist(candidate) &&
				!this.existInVotes(candidate)
			) {
				return this.warningAlert(1)
			}
		}
		if (candidate.position === LineUpType.Representative) {
			if (
				dataExist(candidate, this.votes, 'position', false) &&
				dataExist(candidate, this.votes, 'department', true) &&
				dataExist(candidate, this.votes, 'year', true) &&
				!this.existInVotes(candidate)
			) {
				return this.warningAlert(1)
			}
		}
		this.toggleCard(candidate)
		if (!this.existInVotes(candidate)) {
			return this.votes.push(candidate)
		}
		this.removeVote(candidate)
	}
	toggleCard(candidate: Candidate) {
		const name = this.voteIds[candidate.voter.name.toString()]
		this.voteIds[candidate.voter.name.toString()] =
			name === false || name === undefined ? true : false
	}
	removeVote(candidate: Candidate) {
		this.votes = this.votes.filter((element: any) => {
			return element.id !== candidate.id
		})
	}
	position_is_in_votes(candidate: Candidate) {
		return this.votes.filter((element: any) => {
			return element.position === candidate.position
		}).length
	}
	yearExist(candidate: Candidate) {
		return this.votes.some((element: any) => {
			return element.voter.year === candidate.voter.year
		})
	}
	departmentExist(candidate: Candidate) {
		return this.votes.some((element: any) => {
			return element.voter.department === candidate.voter.department
		})
	}
	courseExist(candidate: Candidate) {
		return this.votes.some((element: any) => {
			return element.voter.course === candidate.voter.course
		})
	}
	sectionExist(candidate: Candidate) {
		return this.votes.some((element: any) => {
			return element.voter.section === candidate.voter.section
		})
	}
	existInVotes(candidate: Candidate) {
		return this.votes.some((element: any) => {
			return element.id === candidate.id
		})
	}
	warningAlert(maximumVotes: number) {
		Alert(
			'Maximum votes exceeded',
			`Maximum of only ${maximumVotes} vote(s) for this position`,
			'error'
		)
	}

	voteIds: any = {}
	submitVote() {
		Fire(
			'Submit Vote?',
			'Are you sure you dont want to review your candidates?',
			'info',
			() => {
				const keysToRemove = ['partylist', 'photo', 'position', 'voter']
				let bets = this.votes
				for (let index in bets) {
					for (let keyToRemove of keysToRemove) {
						delete bets[index][keyToRemove]
					}
				}
				let temp = []
				for (let candidate of bets) {
					temp.push(candidate.id)
				}
				let vote: any = {}
				vote['bets'] = temp
				vote['voter'] = this.user.id()
				new BaseService(
					this.service.firestore,
					Collections.Votes,
					[],
					this.service.store
				).add(vote)
				Alert(
					'Thank you for using CSSC Cloud Based Voting System.',
					`Your vote has been successfully submitted. Stay tuned for the election results.`,
					'success'
				)
			}
		)
	}
}
