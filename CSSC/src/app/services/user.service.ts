import { UserType } from './../Models/User'
import { AdminType } from './../Models/Admin'
import { Injectable } from '@angular/core'
import { Subject, throwError } from 'rxjs'

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
		return localStorage.getItem('role') === UserType.Voter ? true : false
	}

	isCandidate() {
		return localStorage.getItem('role') === UserType.Candidate
			? true
			: false
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

	id() {
		let user: any = localStorage.getItem('user')
		if (user === null) {
			return throwError('No user id found')
		}
		user = JSON.parse(user)
		return user.id
	}
}
