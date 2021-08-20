

import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../..//hooks/useColorScheme'

type Props = {
    icon?: any,
    backgroundColor: string
    title: string
    value: number
};

const Summaries: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    return (
        <View style={[ style.container, { backgroundColor: Colors[ colorScheme ].background } ]}>
            <View style={style.iconContainer}>
                <View style={[ style.iconHolder, { backgroundColor: props.backgroundColor } ]}>
                    {props.icon}
                </View>
            </View>
            <View>
                <Text style={{ fontSize: 16, color: Colors[ colorScheme ].text, fontWeight: 'bold' }}>{props.title}</Text>
                <Text style={{ color: '#ccc' }}>{props.value}</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create( {
    container: {
        margin: 5,
        marginHorizontal: 20,
        padding: 10,
        shadowColor: "rgba(5, 36, 86,.9)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.10,
        shadowRadius: 4.65,
        elevation: 8,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,.2)',
        alignItems: 'center',
        minWidth: 250
    },
    iconContainer: {
        width: 70,
        height: 70,
        marginRight: 20
    },
    iconHolder: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

} )

export default Summaries;
