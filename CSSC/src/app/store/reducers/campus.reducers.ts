import { Action } from '@ngrx/store'
import { Modes } from 'src/app/Models/Modes'
import { Campus } from '../../Models/Campus'

export function CampusReducer(state: Campus = 'Barotac Nuevo', action: Action) {
	return (state = action.type || state)
}

export function ModeReducer(
	state:
		| Modes.AdminCreation
		| Modes.VoterRegistration
		| Modes.PartyListCreation
		| Modes.PartyListLineUps
		| Modes.PlatformCustomization
		| Modes.Voting
		| Modes.Finished
		| string
		| undefined = undefined,
	action: Action
) {
	return (state = action.type || state)
}
