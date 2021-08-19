import { StyleSheet } from 'react-native'
export default StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(150,150,150,.1)',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
	},
	title: {
		fontSize: 16,
		flex: 1,
		marginLeft: 16,
	},
	icon: {
		shadowColor: 'rgba(16,73,162,.5)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.57,
		shadowRadius: 4.65,
		elevation: 6,
	},
})
