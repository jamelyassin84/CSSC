
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { style } from '../CastAVote';

type Props = {};

const Presidential: FC<Props> = ( props ) => {
    return (
        <View>
            <Text style={style.subtitle}>Presidential Candidates</Text>
        </View>
    );
};

export default Presidential;
