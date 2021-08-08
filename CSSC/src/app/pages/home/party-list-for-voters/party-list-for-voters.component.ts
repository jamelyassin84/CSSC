import { BaseService } from './../../../services/base.service'
import { PartyList } from './../../../Models/Partylist'
import { Component, OnInit } from '@angular/core'
import { Collections } from 'src/app/Models/Admin'

@Component({
	selector: 'app-party-list-for-voters',
	templateUrl: './party-list-for-voters.component.html',
	styleUrls: ['./party-list-for-voters.component.scss'],
})
export class PartyListForVotersComponent implements OnInit {
	constructor(private service: BaseService) {}

	ngOnInit(): void {
		this.getPartyLists()
	}

	partylists: PartyList[] = []
	getPartyLists() {
		new BaseService(
			this.service.firestore,
			Collections.Partylist,
			[],
			this.service.store
		)
			.fetchAll()
			.subscribe((partylists: PartyList[] | any[]) => {
				this.partylists = partylists
			})
	}
}
