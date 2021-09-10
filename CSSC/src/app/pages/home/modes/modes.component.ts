import { Collections } from './../../../Models/Admin'
import { Alert, Fire } from 'src/app/components/Alert'
import { Component, OnInit } from '@angular/core'
import { modesArray } from 'src/app/constants/AppConstants'
import { Modes } from 'src/app/Models/Modes'
import { BaseService } from 'src/app/services/base.service'
import { Campus } from 'src/app/Models/Campus'

@Component({
	selector: 'app-modes',
	templateUrl: './modes.component.html',
	styleUrls: ['./modes.component.scss'],
})
export class ModesComponent implements OnInit {
	constructor(private service: BaseService) {
		this.service.store.select('campus').subscribe((campus) => {
			this.campus = campus
		})
	}

	modes: Modes[] = modesArray

	ngOnInit(): void {
		new BaseService(
			this.service.firestore,
			Collections.Mode,
			[],
			this.service.store
		)
			.fetchAll()
			.subscribe((data: any) => {
				if (data.lenth !== 0) {
					this.currentMode = data[0]
				}
			})
	}

	mode: unknown = undefined

	campus: Campus = ''

	currentMode: any = undefined

	setMode() {
		if (this.mode === undefined) {
			Alert('Error', 'Please choose a mode', 'error')
		}
		Fire(
			'Change Mode',
			`Are you sure you want to change mode to ${this.mode}? All Voters will be affected by this operation.Continue?`,
			'info',
			() => {
				let hasMode: boolean = false
				let currentMode: string = ''
				new BaseService(
					this.service.firestore,
					Collections.Mode,
					[],
					this.service.store
				)
					.fetchAll()
					.subscribe((data: any) => {
						if (data.lenth !== 0) {
							currentMode = data[0].id
							hasMode = true
						}
						if (!hasMode) {
							new BaseService(
								this.service.firestore,
								Collections.Mode,
								[],
								this.service.store
							).add({
								mode: this.mode,
								campus: this.campus,
							})
						} else {
							new BaseService(
								this.service.firestore,
								Collections.Mode,
								[],
								this.service.store
							).update(currentMode, {
								mode: this.mode,
								campus: this.campus,
							})
						}
					})
				Alert(
					'Success',
					`Mode has been successfully changed to ${this.mode}`,
					'success'
				)
				this.ngOnInit()
			}
		)
	}
}
