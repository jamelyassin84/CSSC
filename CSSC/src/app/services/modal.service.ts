import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	constructor() {}

	private modal = new Subject()

	close() {
		this.modal.next()
	}

	closeListener() {
		return this.modal.asObservable()
	}
}
