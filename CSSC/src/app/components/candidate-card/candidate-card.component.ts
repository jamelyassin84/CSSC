import { PartyList } from 'src/app/Models/Partylist'
import { BaseService } from './../../services/base.service'
import { Component, Input, OnInit } from '@angular/core'
import { Candidate } from 'src/app/Models/Candidtate'
import { Collections } from 'src/app/Models/Admin'

@Component({
	selector: 'app-candidate-card',
	templateUrl: './candidate-card.component.html',
	styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit {
	@Input() candidate!: Candidate
	@Input() color: string = ''
	@Input() value: number = 0
	@Input() active: boolean = false

	constructor(private service: BaseService) {}

	ngOnInit(): void {}

	partylist: PartyList = {
		acronym: '',
		english_title: '',
		filipino_title: '',
		platform: '',
	}
	fetchPartyList(title: string) {
		this.service.firestore
			.collection(Collections.Partylist, (ref) =>
				ref.where('acronym', '==', title)
			)
			.get()
			.subscribe((partylists: any) => {
				partylists.forEach((partylist: any) => {
					this.partylist = partylist.data()
				})
			})
	}
}
