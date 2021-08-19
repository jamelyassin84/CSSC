import { Platform } from 'react-native'
import { StyleSheet } from 'react-native'
export default StyleSheet.create({
	header: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(150,150,150,.2)',
		alignItems: 'flex-end',
		padding: 10,
		paddingTop: 20,
		marginTop: Platform.OS === 'ios' ? 11 : 5,
	},
	title: {
		fontSize: 16,
		color: '#1049A2',
		fontWeight: 'bold',
	},
	iloilo: {
		height: 50,
		width: 50,
		marginRight: 5,
	},
	ipop: {
		height: 40,
		width: 40,
		marginRight: 5,
	},
})
