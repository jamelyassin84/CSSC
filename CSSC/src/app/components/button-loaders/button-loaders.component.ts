import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-button-loaders',
	templateUrl: './button-loaders.component.html',
	styleUrls: ['./button-loaders.component.scss'],
})
export class ButtonLoadersComponent implements OnInit {
	synonyms = [
		'hold it right there',
		'hold on a second',
		'just a minute',
		'just a sec',
		'wait a second',
		'wait a minute',
		'hold on a minute',
		'hang on',
		'hold on',
		'just a moment',
		'hold your horses',
		'please wait',
		'stay here',
		'stay put',
		'sit tight',
		'stick around',
		'hold the line',
		'wait a moment',
		'be patient',
		'dali lang guid',
		'hulat',
		'wait lang po',
	]

	title = 'hold your horses'
	ngOnInit(): void {
		setInterval(() => {
			this.title =
				this.synonyms[Math.floor(Math.random() * this.synonyms.length)]
		}, 1500)
	}
}
