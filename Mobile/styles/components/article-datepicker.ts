import { StyleSheet } from 'react-native'
export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		margin: 10,
		backgroundColor: 'rgba(113,111,139,.1)',
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 7,
		marginTop: 10,
	},
	menu: {
		fontWeight: '700',
		fontSize: 35,
		marginTop: 50,
		marginLeft: 20,
	},
	button: {
		marginRight: 20,
		flex: 1,
		alignItems: 'center',
		padding: 10,
		borderRadius: 20,
	},
	active: {
		backgroundColor: '#1049A2',
		transform: [{ scale: 1.1 }],
		shadowColor: 'rgba(113,111,139,1)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.57,
		shadowRadius: 4.65,
		elevation: 6,
	},
	buttonText: {
		color: 'gray',
	},
	activeText: {
		color: 'white',
		fontWeight: 'bold',
	},
})
