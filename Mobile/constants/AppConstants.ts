import { LineUpType } from './../Models/LineUp'

export const PoliticalColors = ['#00469E', '#CC110E', '#E46C0B', '#4FBE60']

export default function hideable(value: boolean) {
	return value === true ? {} : { position: 'absolute', left: -500 }
}

export const campuses = ['Barotac Nuevo', 'Dumangas', 'Dingle', 'San Enrique', 'Tiwi']

export const positions = [LineUpType.President, LineUpType.VP, LineUpType.Senator, LineUpType.Governor, LineUpType.Representative, LineUpType.Mayor]

export const yearLevels = ['1st', '2nd', '3rd', '4th', '5th']

export const sections = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K']
