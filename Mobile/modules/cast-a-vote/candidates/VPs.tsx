import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { style } from '../CastAVote';

type Props = {};

const VPs: FC<Props> = ( props ) => {
    return (
        <View>
            <Text style={style.subtitle}>Vice Presidential Candidates</Text>
        </View>
    );
};

export default VPs;
