
import React, { FC } from 'react';
import { View } from 'react-native';

type Props = {};

const Row: FC<Props> = ( props ) => {
    return (
        <View style={{
            flex: 1,
            alignSelf: 'stretch',
            flexDirection: 'row',
        }}>
            {props.children}
        </View>
    );
};

export default Row;
