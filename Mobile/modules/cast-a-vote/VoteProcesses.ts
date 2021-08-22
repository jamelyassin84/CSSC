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
	alert(`Maximum votes exceeded  Maximum of only ${maximumVotes} vote(s) for this position`)
}

export function removeVote(candidate: Candidate, votes: string[] | any) {
	return votes.filter((element: any) => {
		return element.id !== candidate.id
	})
}
