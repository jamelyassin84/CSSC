
import React, { FC } from 'react';
import { View } from 'react-native';
import style from '../../styles/steps/step.style'

type Props = {};

const Dot: FC<Props> = ( props ) => {
    return <View style={style.dot}></View>
};

export default Dot;
