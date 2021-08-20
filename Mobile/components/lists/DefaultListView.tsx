
import { Entypo } from '@expo/vector-icons';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    icon?: any,
    title: String,
    callback?: Function,
};

const DefaultListView: FC<Props> = ( props ) => {
    return (
        <TouchableOpacity onPress={() => {
            props.callback === undefined ? void 0 : props.callback()
        }}>
            <View style={style.container}>
                {props.icon}
                <Text style={style.text}>{props.title}</Text>
                <Entypo name="chevron-thin-right" size={14} color="black" />
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
    text: {
        flex: 1,
        marginLeft: 16
    }
} )

export default DefaultListView;
