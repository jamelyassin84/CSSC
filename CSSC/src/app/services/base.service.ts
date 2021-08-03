import { Inject, Injectable, Optional } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Collections } from '../Models/Admin'

@Injectable({
	providedIn: 'root',
})
export class BaseService {
	constructor(
		public firestore: AngularFirestore,
		@Inject('collection')
		@Optional()
		public collection: Collections | string = '',
		@Inject('where') @Optional() public where: any
	) {}

	wheres(ref: any) {
		for (let key in this.where) {
			ref = ref.where(key, '==', this.where.value)
		}
		return ref
	}

	fetchAll() {
		return this.firestore
			.collection(this.collection, (ref) => this.where(ref))
			.valueChanges()
			.subscribe()
	}

	fetchOne(doc: string) {
		let data: any[] = []
		this.firestore
			.collection(this.collection)
			.doc(doc)
			.get()
			.subscribe((values: any) => {
				values.forEach((doc: any) => {
					data.push({
						id: doc.id,
						data: doc.data(),
					})
				})
			})
		return data
	}

	fetchOneOnArray() {
		this.firestore
			.collection(this.collection, (ref) => this.where(ref))
			.valueChanges()
			.subscribe((values: any) => {
				values.forEach((doc: any) => {
					return {
						id: doc.id,
						data: doc.data(),
					}
				})
			})
	}

	add(data: any) {
		return this.firestore.collection(this.collection).add(data)
	}

	update(doc: string, data: any) {
		return this.firestore.collection(this.collection).doc(doc).update(data)
	}

	delete(doc: string) {
		return this.firestore.collection(this.collection).doc(doc).delete()
	}
}
