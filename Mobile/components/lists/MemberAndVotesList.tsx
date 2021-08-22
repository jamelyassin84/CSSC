
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
    image?: any,
    body?: any,
    values?: any,
}
const MemberAndVotesList: FC<Props> = ( props ) => {
    return (
        <View style={style.container}>
            {props.image}
            <View style={style.body}>
                {props.body}
            </View>
            <View>
                {props.values}
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
        alignItems: 'center'
    },
    body: {
        flex: 1,
        marginLeft: 16
    }
} )

export default MemberAndVotesList
