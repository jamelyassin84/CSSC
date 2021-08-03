import { campuses } from './../../constants/AppConstants'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-campus-picker',
	templateUrl: './campus-picker.component.html',
	styleUrls: ['./campus-picker.component.scss'],
})
export class CampusPickerComponent implements OnInit {
	campuses = campuses
	constructor() {}

	ngOnInit(): void {}

	campus = 'Barotac Nuevo'

	setCampus() {}
}
