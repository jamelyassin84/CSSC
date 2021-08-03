import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'app-voter-login',
	templateUrl: './voter-login.component.html',
	styleUrls: ['./voter-login.component.scss'],
})
export class VoterLoginComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit(): void {}

	login() {
		this.router.navigate(['vote'])
	}
}
