
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/Colors'
import useTheme from '../../hooks/useColorScheme'

type Props = {
    left?: any
    center?: any
}
const LineUp: FC<Props> = ( props ) => {
    const mode = useTheme()
    return (
        <View
            style={[ style.container, { backgroundColor: Colors[ mode ].background } ]}>
            {props.left}
            <View style={style.body}>
                {props.center}
            </View>
        </View>
    )
}

const style = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    body: {
        marginLeft: 16
    },
} )

export default LineUp
