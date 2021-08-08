import { Store } from '@ngrx/store'
import { AngularFireAuth } from '@angular/fire/auth'
import { Component, OnInit } from '@angular/core'
import { AppState } from 'src/app/store/app.state'
import { BaseService } from 'src/app/services/base.service'
import { PartyList } from 'src/app/Models/Partylist'
import { Alert, Fire } from 'src/app/components/Alert'
import { Collections } from 'src/app/Models/Admin'

@Component({
	selector: 'app-add-party-list',
	templateUrl: './add-party-list.component.html',
	styleUrls: ['./add-party-list.component.scss'],
})
export class AddPartyListComponent implements OnInit {
	constructor(private store: Store<AppState>, private service: BaseService) {
		this.store.select('campus').subscribe((campus) => {
			this.data.campus = campus
		})
	}

	data: PartyList | any = {}

	isLoading = false
	save() {
		for (let key in this.data) {
			if (this.data[key] === '') {
				return Alert(
					'Error',
					`One or more fields should not be empty`,
					'error'
				)
			}
		}
		Fire(
			'Add this Party?',
			'Are you sure you want to add this party?',
			'info',
			() => {
				this.isLoading = true
				new BaseService(
					this.service.firestore,
					Collections.Partylist,
					[],
					this.store
				).add(this.data)
				Alert(
					'New Partylist Added ',
					`New Partylist has been added on ${this.data.campus} campus`,
					'success'
				)
				this.isLoading = false
			}
		)
	}

	ngOnInit(): void {}
}
