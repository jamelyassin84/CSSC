
import React, { FC } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import style from '../../styles/header/featured-article.header.style'
import { Ionicons } from '@expo/vector-icons';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

type Props = {
    backgroundColor: string
    title: string | any
};

const CommonHeader: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <View style={[ style.header, { backgroundColor: props.backgroundColor } ]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons style={style.icon} name="chevron-back" size={24} color={Colors[ colorScheme ].text} />
            </TouchableOpacity>
            <Text style={[ style.text, { color: Colors[ colorScheme ].text, width: Dimensions.get( 'screen' ).width - 100 } ]}>{props.title}</Text>
        </View>
    );
};

export default CommonHeader;
