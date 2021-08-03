import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'app-candidate',
	templateUrl: './candidate.component.html',
	styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent implements OnInit {
	@Input() partylist = []
	constructor() {}

	ngOnInit(): void {}
}
