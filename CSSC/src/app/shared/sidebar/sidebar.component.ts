import { SUPERADMIN } from './SideNav'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
	constructor(private router: Router) {}

	sidebar: any[] = SUPERADMIN
	url = this.router.url

	ngOnInit(): void {}

	handleChangeTab() {
		setTimeout(() => {
			this.url = this.router.url
		}, 100)
	}
}
