import { Modes } from '../Models/Modes'
import { LineUpType } from './../Models/LineUp'
export const campuses = [
	'Barotac Nuevo',
	'Dumangas',
	'Dingle',
	'San Enrique',
	'Tiwi',
]

export const positions = [
	LineUpType.President,
	LineUpType.VP,
	LineUpType.Senator,
	LineUpType.Governor,
	LineUpType.Representative,
	LineUpType.Mayor,
]

export const yearLevels = ['1st', '2nd', '3rd', '4th', '5th']

export const sections = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K']

export const PoliticalColors = ['#CC110E', '#00469E', '#E46C0B', '#4FBE60']

export const modesArray = [
	Modes.AdminCreation,
	Modes.VoterRegistration,
	Modes.PartyListCreation,
	Modes.PartyListLineUps,
	Modes.PlatformCustomization,
	Modes.Voting,
	Modes.Finished,
]
