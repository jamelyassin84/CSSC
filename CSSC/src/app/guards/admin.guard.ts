import { UserService } from './../services/user.service'
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanActivate {
	constructor(private router: Router, private user: UserService) {}
	canActivate() {
		if (!this.user.isAdmin()) {
			this.router.navigate(['not-authorized'])
			return false
		}
		return true
	}
}
