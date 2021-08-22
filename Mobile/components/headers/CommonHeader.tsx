
import React, { FC } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import style from '../../styles/header/featured-article.header.style'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import useTheme from '../../hooks/useColorScheme'

type Props = {
    title: string | any
}
const CommonHeader: FC<Props> = ( props ) => {
    const mode = useTheme()
    const navigation = useNavigation()
    return (
        <View style={[ style.header, { backgroundColor: Colors[ mode ].background } ]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons style={style.icon} name="chevron-back" size={24} color={Colors[ mode ].text} />
            </TouchableOpacity>
            <Text style={[ style.text, { color: Colors[ mode ].text, width: Dimensions.get( 'screen' ).width - 100 } ]}>{props.title}</Text>
        </View>
    )
}

export default CommonHeader
