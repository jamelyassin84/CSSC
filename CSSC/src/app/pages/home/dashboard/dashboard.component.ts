import { Collections } from './../../../Models/Admin'
import { BaseService } from './../../../services/base.service'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	constructor(private service: BaseService) {}

	ngOnInit(): void {
		this.getPartylists()
		this.getCandidates()
		this.getVoters()
		this.getVoted()
	}

	partylists: number = 0
	candidates: number = 0
	voters: number = 0
	voted: number = 0

	partylists_data: any = []

	getPartylists() {
		new BaseService(this.service.firestore, Collections.Partylist, [], this.service.store).fetchAll().subscribe((data: any) => {
			this.partylists = data.length
			this.partylists_data = data
		})
	}

	getCandidates() {
		this.service.firestore
			.collection(Collections.Candidate)
			.valueChanges()
			.subscribe((data: any) => {
				this.candidates = data.length
			})
	}

	getVoters() {
		new BaseService(this.service.firestore, Collections.Voters, [], this.service.store).fetchAll().subscribe((data: any) => {
			this.voters = data.length
		})
	}

	getVoted() {
		this.service.firestore
			.collection(Collections.Votes)
			.valueChanges()
			.subscribe((data: any) => {
				this.voted = data.length
			})
	}
}
