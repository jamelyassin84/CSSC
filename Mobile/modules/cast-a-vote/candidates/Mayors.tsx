
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { style } from '../CastAVote';


type Props = {};

const Mayors: FC<Props> = ( props ) => {
    return (
        <View>
            <Text style={style.subtitle}>Candidates for Mayors</Text>
        </View>
    );
};

export default Mayors;
