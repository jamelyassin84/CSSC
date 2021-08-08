import { BaseService } from './../../../services/base.service'
import { PartyList } from 'src/app/Models/Partylist'
import { Component, Input, OnInit } from '@angular/core'
import { Collections } from 'src/app/Models/Admin'
import { Alert, Fire } from 'src/app/components/Alert'

@Component({
	selector: 'app-edit-party-list',
	templateUrl: './edit-party-list.component.html',
	styleUrls: ['./edit-party-list.component.scss'],
})
export class EditPartyListComponent implements OnInit {
	constructor(private service: BaseService) {}

	ngOnInit(): void {}

	@Input() data!: PartyList
	isLoading = false

	save() {
		Fire(
			'Update Party?',
			'Are you sure you want to update this party?',
			'info',
			() => {
				this.isLoading = true
				new BaseService(
					this.service.firestore,
					Collections.Partylist,
					[],
					this.service.store
				).update(this.data.id!, this.data)
				this.isLoading = false
				Alert('Party Updated', '', 'success')
			}
		)
	}
}
