import { yearLevels } from './../constants/AppConstants'
import { Collections } from '../Models/Admin'
import { collection } from './firebase'
import { Candidate } from '../Models/Candidtate'
import { Voter } from '../Models/User'
import { LineUpType } from '../Models/LineUp'
import { campuses } from '../constants/AppConstants'
import { generateName } from './nameGenerator'

const departments = ['COED', 'CHM', 'CICT', 'CIT']
const courses = ['BSHRM', 'BSED', 'BEED', 'BSELTX', , 'BSIT', 'BSAutomotive', 'BSElectricity']
const parties = ['NP', 'PDP-Laban']

const randomString = (length: number) => {
	var result = ''
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var charactersLength = characters.length
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

export function PresidentSeeder() {
	const positions = [LineUpType.President, LineUpType.VP]
	for (let party of parties) {
		for (let position of positions) {
			const voter: Voter = {
				id_number: randomString(10),
				name: generateName(),
				course: courses[Math.floor(Math.random() * courses.length)] || '',
				department: departments[Math.floor(Math.random() * departments.length)],
				year: '2nd',
				campus: campuses[0],
				section: '2-A',
			}
			let candidate: Candidate = {
				position: position,
				partylist: party,
				voter: voter,
			}
			collection(Collections.Voters).add(voter)
			collection(Collections.Candidate).add(candidate)
		}
	}
}

export function SenatorSeeder() {
	for (let party of parties) {
		for (let i = 0; i < 12; i++) {
			const voter: Voter = {
				id_number: randomString(10),
				name: generateName(),
				course: courses[Math.floor(Math.random() * courses.length)] || '',
				department: departments[Math.floor(Math.random() * departments.length)],
				year: '2nd',
				campus: campuses[0],
				section: '2-A',
			}
			let candidate: Candidate = {
				position: LineUpType.Senator,
				partylist: party,
				voter: voter,
			}
			collection(Collections.Voters).add(voter)
			collection(Collections.Candidate).add(candidate)
		}
	}
}

export function GovSeeder() {
	for (let party of parties) {
		for (let department of departments) {
			for (let i = 0; i < 2; i++) {
				const voter: Voter = {
					id_number: randomString(10),
					name: generateName(),
					course: courses[Math.floor(Math.random() * courses.length)] || '',
					department: department,
					year: '2nd',
					campus: campuses[0],
					section: '2-A',
				}
				let candidate: Candidate = {
					position: LineUpType.Governor,
					partylist: party,
					voter: voter,
				}
				collection(Collections.Voters).add(voter)
				collection(Collections.Candidate).add(candidate)
			}
		}
	}
}

export function RepSeeder() {
	for (let party of parties) {
		for (let department of departments) {
			for (let year of yearLevels) {
				for (let i = 0; i < 2; i++) {
					const voter: Voter = {
						id_number: randomString(10),
						name: generateName(),
						course: courses[Math.floor(Math.random() * courses.length)] || '',
						department: department,
						year: year,
						campus: campuses[0],
						section: '2-A',
					}
					let candidate: Candidate = {
						position: LineUpType.Representative,
						partylist: party,
						voter: voter,
					}
					collection(Collections.Voters).add(voter)
					collection(Collections.Candidate).add(candidate)
				}
			}
		}
	}
}

export function seed() {
	// PresidentSeeder()
	// SenatorSeeder()
	// GovSeeder()
	// RepSeeder()
}
