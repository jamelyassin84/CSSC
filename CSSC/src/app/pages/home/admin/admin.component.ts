import { BaseService } from 'src/app/services/base.service'
import { Admin, Collections } from './../../../Models/Admin'
import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'
import { Subscription } from 'rxjs'
import { ReloadService } from 'src/app/services/reload.service'

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
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
		this.getAdmin()
	}

	admins: Admin[] = []
	getAdmin() {
		new BaseService(
			this.service.firestore,
			Collections.Admin,
			[],
			this.service.store
		)
			.fetchAll()
			.subscribe((admins: any) => {
				this.admins = admins
			})
	}

	remove(id: string | any) {
		Fire(
			'Remove Data',
			'Are you sure you want to remove this data?',
			'info',
			() => {
				new BaseService(
					this.service.firestore,
					Collections.Admin,
					[],
					this.service.store
				).remove(id)
			}
		)
	}
}
