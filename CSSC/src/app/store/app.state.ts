import { Campus } from '../Models/Campus'
import { Modes } from '../Models/Modes'

export interface AppState {
	readonly campus: Campus
	readonly mode:
		| Modes.AdminCreation
		| Modes.VoterRegistration
		| Modes.PartyListCreation
		| Modes.PartyListLineUps
		| Modes.PlatformCustomization
		| Modes.Voting
		| Modes.Finished
		| string
		| undefined
}
