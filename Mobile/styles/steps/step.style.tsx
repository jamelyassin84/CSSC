import { Dimensions, StyleSheet } from 'react-native';
export default StyleSheet.create( {
    container: {
        flex: 1, position: 'relative',
        zIndex: 99,
        backgroundColor: 'white',
        height: Dimensions.get( 'screen' ).height
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        margin: 5,
        opacity: .5,
        backgroundColor: '#ccc'
    },
    active: {
        width: 30,
        height: 10,
        borderRadius: 50,
        margin: 5,
        backgroundColor: '#FFC107',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    tab: {
        width: '100%',
        height: 90,
        zIndex: 100,
        position: 'absolute',
        bottom: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        top: '25%',
        alignSelf: 'center',
        position: 'absolute',
        color: '#FFC107'
    }
} )