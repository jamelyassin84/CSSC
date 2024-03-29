
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Colors from '../../constants/Colors'
import useTheme from '../../hooks/useColorScheme'
import { Candidate } from '../../Models/Candidtate'

type Props = {
    candidate: Candidate,
    callback?: Function | any
    left?: any
    center?: any
    right?: any
    active?: boolean | any
}
const CandidateList: FC<Props> = ( props ) => {
    const mode = useTheme()
    return (
        <TouchableOpacity
            onPress={() => props.callback()}
            style={[ style.container, ( props.active === true ? style.active : {} ), { backgroundColor: Colors[ mode ].background } ]}>
            {props.left}
            <View style={style.body}>
                {props.center}
            </View>
            <View>
                {props.right}
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        padding: 16,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    body: {
        marginLeft: 16
    },
    active: {
        borderWidth: 1,
        borderColor: '#007BFF',
        shadowColor: "#007BFF",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 5,
        elevation: 5,
        margin: 5
    }
} )

export default CandidateList
