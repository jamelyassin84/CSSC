
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Candidate } from '../../Models/Candidtate';

type Props = {
    candidate: Candidate,
    callback?: Function | any,
    left?: any
    center?: any
    right?: any
};

const CandidateList: FC<Props> = ( props ) => {
    return (
        <TouchableOpacity
            onPress={() => props.callback()}
            style={style.container}>
            {props.left}
            <View style={style.body}>
                {props.center}
            </View>
            <View>
                {props.right}
            </View>
        </TouchableOpacity>
    );
};

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


export default CandidateList;
