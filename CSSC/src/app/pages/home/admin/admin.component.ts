import { BaseService } from 'src/app/services/base.service'
import { Admin, Collections } from './../../../Models/Admin'
import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
	constructor(private service: BaseService) {}

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
