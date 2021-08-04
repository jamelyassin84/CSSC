import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Fire } from 'src/app/components/Alert'
import { Collections } from 'src/app/Models/Admin'
import { PartyList } from 'src/app/Models/Partylist'
import { BaseService } from 'src/app/services/base.service'
import { ReloadService } from 'src/app/services/reload.service'

@Component({
	selector: 'app-partylists',
	templateUrl: './partylists.component.html',
	styleUrls: ['./partylists.component.scss'],
})
export class PartylistsComponent implements OnInit {
	constructor(
		private service: BaseService,
		private component: ReloadService
	) {
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.ngOnInit()
			})
		)
	}

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	ngOnInit(): void {
		this.getPartylists()
	}

	partylists: PartyList[] = []
	partylist: string = ''

	setPartylist(partylist: string) {
		this.partylist = partylist
	}

	getPartylists() {
		new BaseService(
			this.service.firestore,
			Collections.Partylist,
			[],
			this.service.store
		)
			.fetchAll()
			.subscribe((partylists: any) => (this.partylists = partylists))
	}

	remove(id: string | any) {
		Fire(
			'Remove Data',
			'Are you sure you want to remove this data?',
			'info',
			() => {
				new BaseService(
					this.service.firestore,
					Collections.Partylist,
					[],
					this.service.store
				).remove(id)
			}
		)
	}
}
