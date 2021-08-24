import firebase from 'firebase'

export const FirebaseConfig = {
	apiKey: 'AIzaSyAusAjk7AAzYI9MP_6OIfDl6ZOwPCRHiCQ',
	authDomain: 'cssc-e9cd9.firebaseapp.com',
	projectId: 'cssc-e9cd9',
	storageBucket: 'cssc-e9cd9.appspot.com',
	messagingSenderId: '1087764286726',
	appId: '1:1087764286726:web:852f8c09a3ef00d2bee287',
	measurementId: 'G-402XDTMJHS',
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
