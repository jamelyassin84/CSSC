
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import style from '../../styles/steps/step.style'

type Props = {
    callback: Function
}
const StepContainer: FC<Props> = ( props ) => {
    const mode = useColorScheme()
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[ style.container, { backgroundColor: Colors[ mode ].background } ]}
            onPress={() => props.callback()}>
            {props.children}
        </TouchableOpacity>
    )
}

export default StepContainer
