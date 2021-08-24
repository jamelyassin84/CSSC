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
					if (candidate.voter.department === key && obj[key].votes !== 0) {
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
