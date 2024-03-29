import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
export default StyleSheet.create( {
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)',
        alignItems: 'center',
        paddingBottom: 10
    },
    image: {
        height: 40,
        width: 60,
        resizeMode: 'contain',
    }
} )