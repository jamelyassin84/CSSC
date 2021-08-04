import { UserService } from './../../../services/user.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'app-landing-ui',
	templateUrl: './landing-ui.component.html',
	styleUrls: ['./landing-ui.component.scss'],
})
export class LandingUiComponent implements OnInit {
	constructor(private user: UserService, private router: Router) {}

	ngOnInit(): void {
		if (localStorage.getItem('role') !== null) {
			this.router.navigate(['/home/dashboard'])
			this.user.hasLogin()
		}
	}
}
