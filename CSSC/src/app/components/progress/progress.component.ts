import { Component, OnInit } from '@angular/core'
import { ReloadService } from 'src/app/services/reload.service'

@Component({
	selector: 'app-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
	constructor(private component: ReloadService) {
		this.component.isLoading().subscribe((value: boolean) => {
			if (value === true) {
				this.isLoading = value
				return
			}
			setTimeout(() => {
				this.isLoading = value
			}, 700)
		})
	}

	isLoading: boolean = false
	ngOnInit(): void {}
}
