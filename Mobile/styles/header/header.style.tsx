import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
export default StyleSheet.create( {
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        height: 40,
        width: 60,
        marginRight: 10,
        resizeMode: 'contain',
    }
} )