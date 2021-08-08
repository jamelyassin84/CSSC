import { Collections } from '../../../Models/Admin'
import { Component, Input, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'
import { Candidate } from 'src/app/Models/Candidtate'
import { BaseService } from 'src/app/services/base.service'

@Component({
	selector: 'app-view-member',
	templateUrl: './view-member.component.html',
	styleUrls: ['./view-member.component.scss'],
})
export class ViewMemberComponent implements OnInit {
	constructor(private service: BaseService) {}
	@Input() partylist: string | any = ''
	ngOnInit(): void {
		this.getCandidates()
	}

	candidates: Candidate[] | any = []

	getCandidates() {
		setTimeout(() => {
			this.service.firestore
				.collection(Collections.Candidate, (ref) =>
					ref.where('partylist', '==', this.partylist)
				)
				.valueChanges({ idField: 'id' })
				.subscribe((candidates: Candidate[] | any) => {
					this.candidates = candidates
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
}
