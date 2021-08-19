import React, { FC } from 'react';
import { View } from 'react-native';
import style from '../../styles/steps/step.style'

type Props = {};

const ActiveDot: FC<Props> = ( props ) => {
    return <View style={style.active}></View>
};

export default ActiveDot;
