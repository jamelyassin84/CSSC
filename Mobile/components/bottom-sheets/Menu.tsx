
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Dimensions } from 'react-native'
import { Text } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'

type Props = {
    choices: any[]
    calback: Function
    blur: Function
}
const Menu: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme()

    return (
        <View style={style.bottomSheetContainer}>
            <TouchableOpacity
                style={[ style.cancelButton, { backgroundColor: Colors[ colorScheme ].background, } ]}
                onPress={() => {
                    props.blur( true )
                }}>
                <Text style={[ style.cancelButtonText, { color: 'red' } ]}>Cancel</Text>
            </TouchableOpacity>

            <View style={[ style.choicesContainer, { backgroundColor: Colors[ colorScheme ].background, } ]}>
                {
                    props.choices.map( ( choice: any, index: any ) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    props.calback( choice )
                                }}
                                style={[ style.choicesButton, { borderTopColor: props.choices.length == 1 ? 'transparent' : 'rgba(150,150,150,.3)', backgroundColor: Colors[ colorScheme ].background } ]}
                            >
                                <Text style={[ style.choicesText, { color: Colors[ colorScheme ].text } ]}>{choice}</Text>
                            </TouchableOpacity>
                        )
                    } )
                }
            </View>
        </View>
    )
}

const style = StyleSheet.create( {
    bottomSheetContainer: {
        flexDirection: 'column-reverse',
        width: Dimensions.get( 'screen' ).width,
        position: 'absolute',
        bottom: Dimensions.get( 'screen' ).height / 2
    },
    cancelButton: {
        borderRadius: 10,
        width: '100%',
        padding: 15
    },
    cancelButtonText: {
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 25
    },
    choicesContainer: {
        borderRadius: 10,
        width: '100%',
        marginBottom: 10
    },
    choicesButton: {
        borderRadius: 10,
        width: '100%',
        padding: 15,
        borderTopWidth: 1,
    },
    choicesText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300'
    }
} )

export default Menu
