
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import style from '../../styles/steps/step.style'

type Props = {
    callback: Function
};

const StepContainer: FC<Props> = ( props ) => {

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[ style.container ]}
            onPress={() => props.callback()}>
            {props.children}
        </TouchableOpacity>
    );
};

export default StepContainer;
