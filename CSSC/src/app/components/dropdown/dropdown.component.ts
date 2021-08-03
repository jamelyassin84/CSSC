import { Input } from '@angular/core'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
	constructor() {}
	@Input() buttons: any

	ngOnInit(): void {}
}
