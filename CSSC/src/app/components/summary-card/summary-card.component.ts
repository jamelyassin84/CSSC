import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'app-summary-card',
	templateUrl: './summary-card.component.html',
	styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent implements OnInit {
	constructor() {}
	@Input() title: string = ''
	@Input() value: number = 0
	@Input() class: string = ''
	ngOnInit(): void {}
}
