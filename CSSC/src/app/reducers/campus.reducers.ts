import { Action } from '@ngrx/store'
import { Campus } from './../Models/Campus'

export function CampusReducer(state: Campus = 'Barotac Nuevo', action: Action) {
	return (state = action.type || state)
}
