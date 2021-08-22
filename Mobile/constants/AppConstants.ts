export const PoliticalColors = ['#00469E', '#CC110E', '#E46C0B', '#4FBE60']

export default function hideable(value: boolean) {
	return value === true ? {} : { position: 'absolute', left: -500 }
}
