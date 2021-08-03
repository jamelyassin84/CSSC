import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'app-admin-log-in',
	templateUrl: './admin-log-in.component.html',
	styleUrls: ['./admin-log-in.component.scss'],
})
export class AdminLogInComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit(): void {}

	login() {
		this.router.navigate(['home/dashboard'])
	}
}
