
import React, { FC } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons'
import StepContainer from '../../components/steps/StepContainer'
import StepDescription from '../../components/steps/StepDescription'
import style from '../../styles/steps/step.style'
import Dot from '../../components/steps/Dot'
import ActiveDot from '../../components/steps/ActiveDot'

type Props = {}
const Step3: FC<Props> = ( props ) => {
    const navigation = useNavigation()
    return (
        <StepContainer callback={() => {
            navigation.navigate( 'Step4' )
        }}>
            <Octicons name="note"
                style={style.icon}
                size={170}
            />
            <StepDescription text="Look over on excellent platforms and reforms of each candidate"></StepDescription>
            <View style={style.tab}>
                <Dot></Dot>
                <Dot></Dot>
                <ActiveDot></ActiveDot>
                <Dot></Dot>
                <Dot></Dot>
            </View>
        </StepContainer>
    )
}

export default Step3
