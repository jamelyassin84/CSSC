import { Candidate } from './../../Models/Candidtate'
import { Component, Input, OnInit } from '@angular/core'
import { resolvePosition } from 'src/app/constants/app.helpers'

@Component({
	selector: 'app-candidate-tr',
	templateUrl: './candidate-tr.component.html',
	styleUrls: ['./candidate-tr.component.scss'],
})
export class CandidateTrComponent implements OnInit {
	constructor() {}
	@Input() candidate: any
	ngOnInit(): void {}

	resolvePosition(candidate: Candidate) {
		return resolvePosition(candidate)
	}
}
