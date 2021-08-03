export type Admin = {
	email: string
	password: string
	name: string
	position: string
	campus: string | null
	type: string
	confirm_password: string
}

export enum AdminType {
	SuperAdmin = 'Super Admin',
	Admin = 'Administrator',
}
