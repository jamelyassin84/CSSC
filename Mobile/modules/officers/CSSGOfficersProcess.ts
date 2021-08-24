import { yearLevels } from '../../constants/AppConstants'
import { sortCandidatByName } from '../cast-a-vote/VoteProcesses'

export const GovProcesses = (govs: any, departments: any) => {
	let obj: any = {}
	for (let department of departments) {
		obj[department] = {}
	}
	govs.forEach((candidate: any) => {
		for (let key in obj) {
			if (candidate.votes === obj[key].votes) {
				const data = obj[key]
				obj[key] = []
				obj[key].push(data)
				obj[key].push(candidate)
			} else {
				if (obj[key].votes === undefined || candidate.votes > obj[key].votes) {
					if (candidate.voter.department === key) {
						obj[key] = candidate
					}
				}
			}
		}
	})
	govs = []
	for (let key in obj) {
		if (Array.isArray(obj[key])) {
			obj[key] = sortCandidatByName(obj[key])
			for (let candidate of obj[key]) {
				if (candidate.votes !== 0) govs.push(candidate)
			}
		} else {
			if (obj[key].votes !== 0) govs.push(obj[key])
		}
	}
	return govs
}

export const RepProcesses = (reps: any, departments: any) => {
	let obj: any = {}
	for (let department of departments) {
		for (let year of yearLevels) {
			obj[`${department}-${year}`] = {}
		}
	}
	for (let candidate of reps) {
		for (let key in obj) {
			if (candidate.votes === obj[key].votes) {
				const data = obj[key]
				obj[key] = []
				obj[key].push(data)
				obj[key].push(candidate)
			} else {
				if (obj[key].votes === undefined || candidate.votes > obj[key].votes) {
					const string = key.split('-')
					const department = string[0]
					const year = string[1]
					if (candidate.voter.department === department && candidate.voter.year === year) {
						obj[key] = candidate
						console.log('sa wakas')
					}
				}
			}
		}
	}
	reps = []
	for (let key in obj) {
		if (Array.isArray(obj[key])) {
			obj[key] = sortCandidatByName(obj[key])
			for (let candidate of obj[key]) {
				if (candidate.votes !== 0) reps.push(candidate)
			}
		} else {
			if (obj[key].votes !== 0) reps.push(obj[key])
		}
	}
	return reps
}
