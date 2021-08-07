import { Component, Input, OnInit } from '@angular/core'
import { Candidate } from 'src/app/Models/Candidtate'

@Component({
	selector: 'app-candidate-card',
	templateUrl: './candidate-card.component.html',
	styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit {
	@Input() candidate!: Candidate
	@Input() color: string = ''
	@Input() value: number = 0
	@Input() active: boolean = false

	constructor() {}

	ngOnInit(): void {}
}
