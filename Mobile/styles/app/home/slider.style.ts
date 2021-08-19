import { StyleSheet, Dimensions } from 'react-native'
export default StyleSheet.create({
	scrollview: {
		height: 310,
		width: '100%',
	},
	image: {
		height: '100%',
		width: Dimensions.get('screen').width,
		resizeMode: 'stretch',
		marginLeft: -5,
	},
})
