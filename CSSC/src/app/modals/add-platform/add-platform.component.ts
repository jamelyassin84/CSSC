import { Collections } from 'src/app/Models/Admin'
import { BaseService } from 'src/app/services/base.service'
import { Platform } from './../../Models/Platform'
import { Component, Input, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service'
import { Alert, Fire } from 'src/app/components/Alert'

@Component({
	selector: 'app-add-platform',
	templateUrl: './add-platform.component.html',
	styleUrls: ['./add-platform.component.scss'],
})
export class AddPlatformComponent implements OnInit {
	constructor(private user: UserService, private service: BaseService) {}

	@Input() data: Platform | any = {
		title: '',
		description: '',
		video_link: '',
		candidate_id: '',
	}

	save() {
		this.data.candidate_id = this.user.id()
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
			'Save Changes?',
			'Are you sure you want to save your edited platform?',
			'info',
			() => {
				if (this.data.id !== undefined) {
					this.update()
					return
				}
				this.create()
			}
		)
	}

	create() {
		new BaseService(
			this.service.firestore,
			Collections.Platform,
			[],
			this.service.store
		).add(this.data)
		Alert(
			'Platform Customized',
			`Voters could see your updated platform`,
			'success'
		)
	}

	update() {
		new BaseService(
			this.service.firestore,
			Collections.Platform,
			[],
			this.service.store
		).update(this.data.id, this.data)
		Alert(
			'Platform Customized',
			`Voters could see your updated platform`,
			'success'
		)
	}

	ngOnInit(): void {}
}
