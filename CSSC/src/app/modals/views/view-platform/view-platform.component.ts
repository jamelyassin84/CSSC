import { Platform } from './../../../Models/Platform'
import { BaseService } from './../../../services/base.service'
import { Component, Input, OnInit } from '@angular/core'
import { Collections } from 'src/app/Models/Admin'

@Component({
	selector: 'app-view-platform',
	templateUrl: './view-platform.component.html',
	styleUrls: ['./view-platform.component.scss'],
})
export class ViewPlatformComponent implements OnInit {
	constructor(private service: BaseService) {}
	@Input() voter_id: string | any = ''

	platform: Platform = {
		title: '',
		description: '',
		video_link: '',
		candidate_id: '',
	}
	isLoading: boolean = true
	ngOnInit(): void {
		setTimeout(() => {
			this.isLoading = true
			this.service.firestore
				.collection(Collections.Platform, (ref) =>
					ref.where('candidate_id', '==', this.voter_id)
				)
				.get()
				.subscribe((platforms: Platform[] | any) => {
					platforms.forEach((platform: any) => {
						this.platform = platform.data()
					})
					this.isLoading = false
				})
		}, 500)
	}
}
