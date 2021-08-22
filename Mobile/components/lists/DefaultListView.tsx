
import React, { FC } from 'react'
import { Entypo } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useTheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'

type Props = {
    icon?: any,
    title: String,
    callback?: Function,
}
const DefaultListView: FC<Props> = ( props ) => {
    const mode = useTheme()
    return (
        <TouchableOpacity style={style.container} onPress={() => {
            props.callback === undefined ? void 0 : props.callback()
        }}>
            {props.icon}
            <Text style={[ style.text, { color: Colors[ mode ].text } ]}>{props.title}</Text>
            <Entypo name="chevron-thin-right" size={14} color="black" />
        </TouchableOpacity>
    )
}

const style = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)',
        alignItems: 'center'
    },
    text: {
        flex: 1,
        marginLeft: 16
    }
} )

export default DefaultListView
