
import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { View } from 'react-native'
import StepDescription from '../../components/steps/StepDescription'
import StepContainer from '../../components/steps/StepContainer'
import style from '../../styles/steps/step.style'
import Dot from '../../components/steps/Dot'
import ActiveDot from '../../components/steps/ActiveDot'

type Props = {}
const Step4: FC<Props> = ( props ) => {
    const navigation = useNavigation()
    return (
        <StepContainer callback={() => {
            navigation.navigate( 'Step5' )
        }}>
            <AntDesign name="barchart"
                style={style.icon}
                size={170}
            />
            <StepDescription text="be updated on real-time Election Results"></StepDescription>
            <View style={style.tab}>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
                <ActiveDot></ActiveDot>
                <Dot></Dot>
            </View>
        </StepContainer>
    )
}

export default Step4
