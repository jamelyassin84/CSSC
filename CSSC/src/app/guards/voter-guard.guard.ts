import { UserService } from './../services/user.service'
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

@Injectable({
	providedIn: 'root',
})
export class VoterGuardGuard implements CanActivate {
	constructor(private router: Router, private user: UserService) {}
	canActivate() {
		if (!this.user.isVoter()) {
			this.router.navigate(['not-authorized'])
			return false
		}
		return true
	}
}
