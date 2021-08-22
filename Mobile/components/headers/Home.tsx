
import React, { FC } from 'react'
import { Text, View, Image } from 'react-native'
import Colors from '../../constants/Colors'
import useTheme from '../../hooks/useColorScheme'
import style from '../../styles/header/header.style'

type Props = {
    text: String
}
const HomeHeader: FC<Props> = ( props ) => {
    const mode = useTheme()
    return (
        <View>
            <View style={[ style.header, { backgroundColor: Colors[ mode ].background } ]}>
                <Image style={style.image} source={require( '../../assets/logo/trans-logo.png' )} />
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors[ mode ].text }}>{props.text}</Text>
            </View>
        </View>
    )
}

export default HomeHeader
