import { ModalService } from 'src/app/services/modal.service'
import { Component, HostListener, OnInit } from '@angular/core'

@Component({
	selector: 'app-home-index',
	templateUrl: './home-index.component.html',
	styleUrls: ['./home-index.component.scss'],
})
export class HomeIndexComponent implements OnInit {
	constructor(private service: ModalService) {
		this.service.sideBarOpenListener().subscribe((mode: boolean) => {
			this.sidebarIsOpen = mode
		})
	}

	sidebarIsOpen: boolean = true
	innerWidth: number = 0
	ngOnInit(): void {
		this.innerWidth = window.innerWidth
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.innerWidth = window.innerWidth
	}
}
