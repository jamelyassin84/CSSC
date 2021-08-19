import React, { FC } from 'react';
import StepContainer from '../../components/steps/StepContainer';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StepDescription from '../../components/steps/StepDescription';
import { View } from 'react-native';
import style from '../../styles/steps/step.style'
import Dot from '../../components/steps/Dot';
import ActiveDot from '../../components/steps/ActiveDot';

type Props = {};

const Step5: FC<Props> = ( props ) => {
    const navigation = useNavigation();
    return (
        <StepContainer callback={() => {
            navigation.navigate( 'ElectionResults' )
        }}>
            <MaterialCommunityIcons name="vote-outline"
                style={style.icon}
                size={170}
            />
            <StepDescription text="and Cast a Vote on your Favorite Electoral Candidate"></StepDescription>
            <View style={style.tab}>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
                <ActiveDot></ActiveDot>
            </View>
        </StepContainer>
    );
};

export default Step5;
