
import React, { FC } from 'react';
import { Text, View } from 'react-native';

type Props = {};

const Column: FC<Props> = ( props ) => {
    return (
        <View style={{
            flex: 1,
            alignSelf: 'stretch',
            borderWidth: 1,
            borderColor: 'rgba(150,150,150,.1)',
            padding: 10,
            marginTop: 10
        }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>{props.children}</Text>
        </View>
    );
};

export default Column;
