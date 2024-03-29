import { LineUpType } from './../../Models/LineUp'
import { Candidate } from '../../Models/Candidtate'
import { PoliticalColors } from '../../constants/AppConstants'

export function toggleCard(candidate: Candidate, voteNames: any) {
	const name = voteNames[candidate.voter.name.toString()]
	return (voteNames[candidate.voter.name.toString()] = name === false || name === undefined ? true : false)
}

export function position_is_in_votes(candidate: Candidate, votes: string[] | any) {
	return votes.filter((element: any) => {
		return element.position === candidate.position
	}).length
}

export function existInVotes(candidate: Candidate, votes: string[] | any) {
	return votes.some((element: any) => {
		return element.id === candidate.id
	})
}

export function warningAlert(maximumVotes: number) {
	alert(`Maximum votes exceeded ${'\n'}  Maximum of only ${maximumVotes} vote(s) for this position`)
}

export function removeVote(candidate: Candidate, votes: string[] | any) {
	return votes.filter((element: any) => {
		return element.id !== candidate.id
	})
}

export function yearExist(candidate: Candidate, votes: string[] | any) {
	return votes.some((element: any) => {
		return element.voter.year === candidate.voter.year
	})
}

export function departmentExist(candidate: Candidate, votes: string[] | any) {
	for (let element of votes) {
		if (element.voter.department === candidate.voter.department) {
			return true
		}
	}
	return false
}

export function courseExist(candidate: Candidate, votes: string[] | any) {
	return votes.some((element: any) => {
		return element.voter.course === candidate.voter.course
	})
}

export function sectionExist(candidate: Candidate, votes: string[] | any) {
	return votes.some((element: any) => {
		return element.voter.section === candidate.voter.section
	})
}

export const sortCandidatesByPosition = (temp: Candidate[]) => {
	let pres: Candidate[] = []
	let vps: Candidate[] = []
	let sens: Candidate[] = []
	let govs: Candidate[] = []
	let reps: Candidate[] = []
	let mayors: Candidate[] = []
	temp.forEach((candidate: Candidate) => {
		if (candidate.position === LineUpType.President) {
			pres.push(candidate)
		}
		if (candidate.position === LineUpType.VP) {
			vps.push(candidate)
		}
		if (candidate.position === LineUpType.Senator) {
			sens.push(candidate)
		}
		if (candidate.position === LineUpType.Governor) {
			govs.push(candidate)
		}
		if (candidate.position === LineUpType.Representative) {
			reps.push(candidate)
		}
		if (candidate.position === LineUpType.Mayor) {
			mayors.push(candidate)
		}
	})
	return [...[], ...pres, ...vps, ...sens, ...govs, ...reps, ...mayors]
}

export const sortCandidatByName = (candidates: Candidate[]) => {
	return candidates.sort((a: Candidate, b: Candidate) => a.voter.name.localeCompare(b.voter.name))
}

export const sortByVotes = (candidates: any[]) => {
	return candidates.sort((a: any, b: any) => b.votes - a.votes)
}

export const resolveBorder = (candidate: Candidate, parties: any) => {
	if (candidate.partylist === parties[0]) {
		return { borderColor: PoliticalColors[0], borderRadius: 3 }
	}
	if (candidate.partylist === parties[1]) {
		return { borderColor: PoliticalColors[1], borderRadius: 3 }
	}
	if (candidate.partylist === parties[2]) {
		return { borderColor: PoliticalColors[2], borderRadius: 3 }
	}
	return { borderColor: PoliticalColors[1], borderRadius: 3 }
}

export const resolveText = (candidate: Candidate, parties: any) => {
	if (candidate.partylist === parties[0]) {
		return { color: PoliticalColors[0] }
	}
	if (candidate.partylist === parties[1]) {
		return { color: PoliticalColors[1] }
	}
	if (candidate.partylist === parties[2]) {
		return { color: PoliticalColors[2] }
	}
	return { color: PoliticalColors[1] }
}
