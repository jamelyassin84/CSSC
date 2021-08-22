
import React, { FC } from 'react'
import { Platform, Text } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'

type Props = {
    text: string
}
const StepDescription: FC<Props> = ( props ) => {
    const mode = useColorScheme()
    return <Text
        style={{
            zIndex: 9,
            alignSelf: 'center', position: 'absolute',
            top: '50%',
            fontSize: Platform.OS == 'ios' ? 35 : 25,
            fontWeight: '200',
            textAlign: 'center',
            paddingHorizontal: 50,
            color: Colors[ mode ].text
        }}>
        {props.text}
    </Text>

}

export default StepDescription
