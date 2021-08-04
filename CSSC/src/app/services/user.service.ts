import { AdminType } from './../Models/Admin'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class UserService {
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
}
