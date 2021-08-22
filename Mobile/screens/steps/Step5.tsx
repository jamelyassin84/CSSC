import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from 'react-native'
import style from '../../styles/steps/step.style'
import Dot from '../../components/steps/Dot'
import StepContainer from '../../components/steps/StepContainer'
import StepDescription from '../../components/steps/StepDescription'
import ActiveDot from '../../components/steps/ActiveDot'

type Props = {}

const Step5: FC<Props> = ( props ) => {
    const navigation = useNavigation()
    return (
        <StepContainer callback={() => {
            navigation.navigate( 'SignIn' )
        }}>
            <MaterialCommunityIcons name="vote-outline"
                style={style.icon}
                size={170}
            />
            <StepDescription text="Anwser the call of time and Exercise your right to vote!"></StepDescription>
            <View style={style.tab}>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
                <ActiveDot></ActiveDot>
            </View>
        </StepContainer>
    )
}

export default Step5
