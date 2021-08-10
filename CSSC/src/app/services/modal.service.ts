import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	constructor() {}

	private modal = new Subject()
	private sidebar = new Subject<boolean>()

	openSidebar(mode: boolean) {
		this.sidebar.next(mode)
	}

	sideBarOpenListener() {
		return this.sidebar.asObservable()
	}

	close() {
		this.modal.next()
	}

	closeListener() {
		return this.modal.asObservable()
	}
}
