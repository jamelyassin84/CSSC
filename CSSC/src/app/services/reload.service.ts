import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class ReloadService {
	private reload = new Subject()
	private load = new Subject<boolean>()

	willLoad(mode: boolean) {
		this.load.next(mode)
	}

	isLoading() {
		return this.load.asObservable()
	}

	willReload() {
		this.reload.next()
	}

	shouldReload() {
		return this.reload.asObservable()
	}
}
