import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Alert, Fire } from 'src/app/components/Alert'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit(): void {}

	logout() {
		Fire('Log-Out?', 'Are you sure you want to Log-Out?', 'info', () => {
			localStorage.clear()
			this.router.navigate(['/'])
			Alert(
				'Thank you Karl',
				' For using CSSC Online Election System',
				'success'
			)
		})
	}
}
