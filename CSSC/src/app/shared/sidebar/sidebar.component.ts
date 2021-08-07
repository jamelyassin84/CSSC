import { UserService } from './../../services/user.service'
import { ADMIN, CANDIDATE, SUPERADMIN, VOTER } from './SideNav'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
	constructor(private router: Router, private user: UserService) {
		this.user.listenToLogin().subscribe(() => {
			this.ngOnInit()
		})
	}

	sidebar: any[] = []
	url = this.router.url

	ngOnInit(): void {
		if (this.user.isSuperAdmin()) {
			this.sidebar = SUPERADMIN
		}
		if (this.user.isAdmin()) {
			this.sidebar = ADMIN
		}
		if (this.user.isVoter()) {
			this.sidebar = VOTER
		}
		if (this.user.isCandidate()) {
			this.sidebar = CANDIDATE
		}
	}

	handleChangeTab() {
		setTimeout(() => {
			this.url = this.router.url
		}, 100)
	}
}
