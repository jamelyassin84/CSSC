import { PartyList } from './../Models/Partylist'
import { Candidate } from '../Models/Candidtate'
import { LineUpType } from '../Models/LineUp'
import { PoliticalColors } from './AppConstants'
import { sortBy } from './helpers'

export const sortCandidatesByPosition = (temp: Candidate[]) => {
	let pres: Candidate[] = []
	let vps: Candidate[] = []
	let sens: Candidate[] = []
	let govs: Candidate[] = []
	let reps: Candidate[] = []
	let mayors: Candidate[] = []
	temp.forEach((candidate: Candidate) => {
		if (candidate.position === LineUpType.President) pres.push(candidate)
		if (candidate.position === LineUpType.VP) vps.push(candidate)
		if (candidate.position === LineUpType.Senator) sens.push(candidate)
		if (candidate.position === LineUpType.Governor) govs.push(candidate)
		if (candidate.position === LineUpType.Representative)
			reps.push(candidate)
		if (candidate.position === LineUpType.Mayor) mayors.push(candidate)
	})
	return [
		...[],
		...pres,
		...vps,
		...sortBy(sens, 'votes', 'ASC', 'number'),
		...sortBy(govs, 'department', 'ASC', 'string', true),
		...sortBy(reps, 'department', 'ASC', 'string', true),
		...mayors,
	]
}

export const resolveColor = (
	candidate: Candidate,
	parties: PartyList[],
	mode: 'text' | 'border'
) => {
	for (let index in parties) {
		if (mode === 'border') {
			if (candidate.partylist === parties[index]) {
				return `border:1px solid ${PoliticalColors[index]}`
			}
			return `border:1px solid ${PoliticalColors[1]}`
		}
		return `color:${PoliticalColors[index]}`
	}
	return `color:${PoliticalColors[1]}`
}

export const resolvePosition = (candidate: Candidate) => {
	if (candidate.position === LineUpType.Governor) {
		return `${candidate.voter.department} Governor`
	}
	if (candidate.position === LineUpType.Representative) {
		return ` ${candidate.voter.department} ${candidate.voter.year} year Representative`
	}
	return candidate.position
}
