
import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import style from '../../styles/header/about.style'

type Props = {}
const AboutHeader: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme()
    return (
        <View style={style.header}>
            <Image
                style={style.iloilo}
                source={require( '../../assets/logo/iloilo-seal.png' )}
            />
            <Image
                style={style.ipop}
                source={require( '../../assets/logo/ipo-logo.png' )}
            />
            <View>
                <Text style={{ color: Colors[ colorScheme ].text }}>Republic of the Philippines</Text>
                <Text style={{ color: Colors[ colorScheme ].text }}>Province of Iloilo</Text>
                <Text style={style.title}>Provincial Population Office</Text>
            </View>
        </View>
    )
}

export default AboutHeader
