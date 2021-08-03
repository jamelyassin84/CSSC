import { Component, OnInit } from '@angular/core'
import { ReloadService } from 'src/app/services/reload.service'

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
	constructor(private component: ReloadService) {
		this.component.isLoading().subscribe((value: boolean) => {
			if (value === true) {
				this.isLoading = value
				return
			}
			setTimeout(() => {
				this.isLoading = value
			}, 600)
		})
	}

	isLoading: boolean = true
	ngOnInit(): void {}
}
