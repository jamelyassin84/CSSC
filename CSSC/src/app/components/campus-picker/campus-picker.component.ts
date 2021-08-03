import { Component, OnInit } from '@angular/core'
import { campuses } from './../../constants/AppConstants'
import { Campus } from './../../Models/Campus'
import { AppState } from './../../app.state'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

@Component({
	selector: 'app-campus-picker',
	templateUrl: './campus-picker.component.html',
	styleUrls: ['./campus-picker.component.scss'],
})
export class CampusPickerComponent implements OnInit {
	constructor(private store: Store<AppState>) {
		this.campus = this.store.select('campus')
	}

	campus!: Observable<Campus>

	campuses: any[] = campuses

	ngOnInit(): void {
		this.store.dispatch({ type: 'Barotac Nuevo' })
	}

	setCampus(event: any) {
		this.store.dispatch({ type: event.value })
	}
}
