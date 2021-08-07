export type Voter = {
	id?: string
	id_number: string
	name: string
	department: string
	course: string
	year: string
	campus: string
	section: string
}

export enum UserType {
	Voter = 'voter',
	Candidate = 'candidate',
}
