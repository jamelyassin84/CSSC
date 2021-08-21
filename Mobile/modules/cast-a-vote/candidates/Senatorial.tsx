import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { style } from '../CastAVote';

type Props = {};

const Senatorial: FC<Props> = ( props ) => {
    return (
        <View>
            <Text style={style.subtitle}>Senatorial Candidates</Text>
        </View>
    );
};

export default Senatorial;
