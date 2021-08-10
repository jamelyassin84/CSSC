import { UserService } from './../../services/user.service'
import { Component, OnInit } from '@angular/core'
import { campuses } from './../../constants/AppConstants'
import { Campus } from './../../Models/Campus'
import { AppState } from '../../store/app.state'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { ReloadService } from 'src/app/services/reload.service'

@Component({
	selector: 'app-campus-picker',
	templateUrl: './campus-picker.component.html',
	styleUrls: ['./campus-picker.component.scss'],
})
export class CampusPickerComponent implements OnInit {
	constructor(
		private store: Store<AppState>,
		private Component: ReloadService,
		private user: UserService
	) {
		this.campus = this.store.select('campus')
	}

	isSuperAdmin = this.user.isSuperAdmin()

	campus!: Observable<Campus>

	campuses: any[] = campuses

	ngOnInit(): void {
		if (!this.isSuperAdmin) {
			let data: any = localStorage.getItem('user')
			data = JSON.parse(data)
			this.store.dispatch({ type: data.campus })
			return
		}
		this.store.dispatch({ type: 'Barotac Nuevo' })
	}

	setCampus(event: any) {
		this.store.dispatch({ type: event.value })
		this.Component.willReload()
	}
}
