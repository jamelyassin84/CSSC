import { Candidate } from './../../../Models/Candidtate'
import { Collections } from 'src/app/Models/Admin'
import { UserService } from './../../../services/user.service'
import { BaseService } from './../../../services/base.service'
import { Component, OnInit } from '@angular/core'
import { sortBy } from 'src/app/constants/helpers'
import { sortCandidatesByPosition } from 'src/app/constants/app.helpers'

@Component({
	selector: 'app-voted-candidates',
	templateUrl: './voted-candidates.component.html',
	styleUrls: ['./voted-candidates.component.scss'],
})
export class VotedCandidatesComponent implements OnInit {
	constructor(private service: BaseService, private user: UserService) {}

	ngOnInit(): void {
		this.getLineUps()
	}

	candidates: Candidate[] | any = []

	getLineUps() {
		this.service.firestore
			.collection(Collections.Votes)
			.valueChanges()
			.subscribe((data: any) => {
				let bets: string[] = []
				if (data.length !== 0) {
					data.forEach((doc: any) => {
						const data = doc['bets']
						data.forEach((id: string) => {
							bets.push(id)
						})
						let candidates: any = []
						let itemsProcessed = 0
						bets.forEach((bet: string, index: number, array) => {
							this.service.firestore
								.collection(Collections.Candidate)
								.doc(bet)
								.valueChanges()
								.subscribe((doc) => {
									itemsProcessed++
									candidates.push(doc)
									if (itemsProcessed === array.length) {
										this.candidates =
											sortCandidatesByPosition(candidates)
									}
								})
						})
					})
				}
			})
	}
}
