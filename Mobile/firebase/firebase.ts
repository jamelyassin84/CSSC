import firebase from 'firebase'

export const FirebaseConfig = {
	apiKey: 'AIzaSyBTCUirRaMcr59TdpjWEITUZGG6EqRbDtY',
	authDomain: 'test-2d860.firebaseapp.com',
	projectId: 'test-2d860',
	storageBucket: 'test-2d860.appspot.com',
	messagingSenderId: '410882144600',
	appId: '1:410882144600:web:bfc4cafe7b3a0ac3ff0d2d',
	measurementId: 'G-9K1MGJFTT9',
}

export function collection(collection: any) {
	return firebase.firestore().collection(collection)
}

export async function getCollection(collection: any, ref = firebase.firestore().collection(collection)) {
	ref.get()
		.then((snapShot) => {
			let temp: any = []
			snapShot.forEach((doc) => {
				temp.push(Object.assign(doc.data(), { id: doc.id }))
			})
			return temp
		})
		.catch((error) => {
			console.warn(error)
			alert('Connection Error')
		})
}
