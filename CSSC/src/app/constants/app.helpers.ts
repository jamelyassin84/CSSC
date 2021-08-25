import { Voter } from './../Models/User'
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
	temp.forEach((candidate: Candidate) => {
		if (candidate.position === LineUpType.President) pres.push(candidate)
		if (candidate.position === LineUpType.VP) vps.push(candidate)
		if (candidate.position === LineUpType.Senator) sens.push(candidate)
		if (candidate.position === LineUpType.Governor) govs.push(candidate)
		if (candidate.position === LineUpType.Representative)
			reps.push(candidate)
	})
	return [
		...[],
		...pres,
		...vps,
		...sortBy(sens, 'votes', 'ASC', 'number'),
		...sortBy(govs, 'department', 'ASC', 'string', true),
		...sortBy(
			sortBy(reps, 'year', 'ASC', 'string', true),
			'department',
			'ASC',
			'string',
			true
		),
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

export const filterByStudent = (
	candidates: Candidate[],
	type:
		| LineUpType.Governor
		| LineUpType.Representative
		| LineUpType.President
		| LineUpType.VP
		| LineUpType.Senator
) => {
	let user: Voter = JSON.parse(localStorage.getItem('user') || '')
	if (
		type === LineUpType.President ||
		type === LineUpType.VP ||
		type === LineUpType.Senator
	) {
		return candidates.filter(
			(candidate: Candidate) => user.campus === candidate.voter.campus
		)
	}
	if (type === LineUpType.Governor) {
		return candidates.filter(
			(candidate: Candidate) =>
				user.campus &&
				user.department === candidate.voter.department &&
				candidate.voter.campus
		)
	}
	return candidates.filter(
		(candidate: Candidate) =>
			user.campus &&
			user.department &&
			user.year === candidate.voter.department &&
			candidate.voter.campus &&
			candidate.voter.year
	)
}
