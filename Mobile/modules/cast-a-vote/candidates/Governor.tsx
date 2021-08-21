import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { style } from '../CastAVote';

type Props = {};

const Governor: FC<Props> = ( props ) => {
    return (
        <View>
            <Text style={style.subtitle}>Candidates for Governor</Text>
        </View>
    );
};

export default Governor;
