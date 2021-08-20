
import React, { FC } from 'react';
import { View } from 'react-native';


type Props = {};

const Tbody: FC<Props> = ( props ) => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {props.children}
        </View>
    );
};

export default Tbody;
