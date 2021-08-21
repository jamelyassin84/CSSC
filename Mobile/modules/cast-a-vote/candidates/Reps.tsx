
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { style } from '../CastAVote';

type Props = {};

const Reps: FC<Props> = ( props ) => {
    return (
        <View>
            <Text style={style.subtitle}>Candidates for Representative</Text>
        </View>
    );
};

export default Reps;
