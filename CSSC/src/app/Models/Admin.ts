export type Admin = {
	email?: string
	id?: string
	password?: string
	name: string
	position: string
	campus: string | null
	type: string
	confirm_password?: string
}

export enum AdminType {
	SuperAdmin = 'Super Admin',
	Admin = 'Administrator',
}

export enum Collections {
	Admin = 'admins',
	Candidate = 'candidates',
	Partylisst = 'party-lists',
	Platform = 'platforms',
	Voters = 'voters',
	Votes = 'votes',
}
