import { Voter } from './../Models/User'
import { Collections } from './../Models/Admin'
import { AppState } from '../store/app.state'
import { Store } from '@ngrx/store'
import { Campus } from './../Models/Campus'
import { Inject, Injectable, Optional } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Subject } from 'rxjs'
import { Modes } from '../Models/Modes'

@Injectable({
	providedIn: 'root',
})
export class BaseService {
	constructor(
		public firestore: AngularFirestore,
		@Inject('collection')
		@Optional()
		public collection: Collections | string = '',
		@Inject('where') @Optional() public where: any,
		public store: Store<AppState>
	) {
		this.store.select('campus').subscribe((campus) => {
			this.campus = campus
		})
		this.store.select('mode').subscribe((mode) => {
			this.mode = mode
		})
	}

	campus: Campus = ''
	mode:
		| Modes.AdminCreation
		| Modes.VoterRegistration
		| Modes.PartyListCreation
		| Modes.PartyListLineUps
		| Modes.PlatformCustomization
		| Modes.Voting
		| Modes.Finished
		| string
		| undefined = undefined

	wheres(builder: any) {
		for (let index of this.where) {
			for (let key in index) {
				builder = builder.where(key, '==', index[key])
			}
		}
		return builder.where('campus', '==', this.campus)
	}

	fetchAll() {
		const builder = this.firestore.collection(this.collection).ref
		return this.firestore
			.collection(this.collection, () => this.wheres(builder))
			.valueChanges<any>({ idField: 'id' })
	}

	fetchOne(doc: string) {
		this.firestore
			.collection(this.collection)
			.doc(doc)
			.get()
			.subscribe((value: any) => {
				return {
					value: value.id,
					data: value.data(),
				}
			})
	}

	async fetchOneInArray() {
		let data: any = {}
		const builder = this.firestore.collection(this.collection).ref
		this.firestore
			.collection(this.collection, () => this.wheres(builder))
			.valueChanges()
			.subscribe((values: any) => {
				values.forEach((doc: any) => {
					data = Object.assign({ id: doc.id, data: doc.data() })
				})
				return data
			})
	}

	add(data: any) {
		return this.firestore.collection(this.collection).add(data)
	}

	update(doc: string, data: any) {
		return this.firestore.collection(this.collection).doc(doc).update(data)
	}

	remove(doc: string) {
		return this.firestore.collection(this.collection).doc(doc).delete()
	}
}
