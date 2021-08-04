import { AdminType } from './../Models/Admin'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	hasUser = new Subject()

	isAdmin() {
		return localStorage.getItem('role') === AdminType.Admin ? true : false
	}

	isSuperAdmin() {
		return localStorage.getItem('role') === AdminType.SuperAdmin
			? true
			: false
	}

	isVoter() {
		return localStorage.getItem('role') === 'voter' ? true : false
	}

	hasLogin() {
		this.hasUser.next()
	}

	listenToLogin() {
		return this.hasUser.asObservable()
	}

	name() {
		let user: any = localStorage.getItem('user')
		if (user === null) {
			return 'CSSC Super Administrator'
		}
		user = JSON.parse(user)
		return user.name || user.fullname
	}
}
