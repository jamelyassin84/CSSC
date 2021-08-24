import { Voter } from './User'

export type Candidate = {
	position: string
	photo?: string | null
	partylist: any
	voter: Voter
	id?: any
	votes?: number
}
