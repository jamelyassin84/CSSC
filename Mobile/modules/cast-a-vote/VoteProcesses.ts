import { LineUpType } from './../../Models/LineUp'
import { Candidate } from '../../Models/Candidtate'

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
	return votes.some((element: any) => {
		return element.voter.department === candidate.voter.department
	})
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
