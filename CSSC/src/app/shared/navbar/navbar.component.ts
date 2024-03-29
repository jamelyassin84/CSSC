import { ModalService } from 'src/app/services/modal.service'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Alert, Fire } from 'src/app/components/Alert'
import { UserService } from 'src/app/services/user.service'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	constructor(
		private router: Router,
		private user: UserService,
		private service: ModalService
	) {
		this.user.listenToLogin().subscribe(() => {
			this.ngOnInit()
		})
	}

	ngOnInit(): void {
		this.name = this.user.name()
	}

	name = ''

	logout() {
		Fire('Log-Out?', 'Are you sure you want to Log-Out?', 'info', () => {
			localStorage.clear()
			this.router.navigate(['/'])
			Alert(
				`Thank you ${this.name}`,
				' For using CSSC Online Election System',
				'success'
			)
		})
	}

	toggleSidebar() {
		this.service.openSidebar(true)
	}
}
