import { StyleSheet } from 'react-native'
export default StyleSheet.create({
	featuredArticle: {
		marginTop: -2,
		padding: 15,
		borderTopWidth: 1,
		borderTopColor: 'rgba(150,150,150,.3)',
		flexDirection: 'row',
		paddingVertical: 15,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: 80,
		width: 120,
		borderRadius: 5,
		marginRight: 16,
		resizeMode: 'contain',
	},
	texts: {
		width: '60%',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
		marginBottom: 15,
	},
})
