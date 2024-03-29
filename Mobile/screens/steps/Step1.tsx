import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import StepContainer from '../../components/steps/StepContainer'
import style from '../../styles/steps/step.style'
import ActiveDot from '../../components/steps/ActiveDot'
import Dot from '../../components/steps/Dot'
import * as Animatable from 'react-native-animatable'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { seed } from '../../firebase/seeder'

type Props = {}
const Step1: FC<Props> = ( props ) => {

    React.useEffect( () => {
        seed()
    }, [] )
    const mode = useColorScheme()
    const navigation = useNavigation()

    return (
        <StepContainer callback={() => {
            navigation.navigate( 'Step2' )
        }}>
            <Animatable.Text
                animation="fadeIn"
                style={{
                    color: Colors[ mode ].text,
                    zIndex: 9,
                    alignSelf: 'center', position: 'absolute',
                    top: '45%',
                    fontSize: 22,
                    textAlign: 'center',
                }}>
                Welcome to
            </Animatable.Text>
            <Animatable.Text
                animation="slideInUp"
                style={{
                    color: Colors[ mode ].text,
                    zIndex: 9,
                    alignSelf: 'center', position: 'absolute',
                    top: '58%',
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: 20,

                }}>
                CSSC's Cloud Based Election System
            </Animatable.Text>
            <Animatable.Image
                animation="zoomIn"
                style={{
                    resizeMode: 'contain',
                    position: 'absolute',
                    top: '17%',
                    zIndex: 9,
                    alignSelf: 'center',
                    height: 200,
                    width: 200,
                }}
                source={require( '../../assets/logo/trans-logo.png' )}
            />
            <View style={style.tab}>
                <ActiveDot></ActiveDot>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
            </View>
        </StepContainer>
    )
}

export default Step1
