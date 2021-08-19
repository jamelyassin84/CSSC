
import React, { FC } from 'react';
import { Text, View, Image } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import style from '../../styles/header/header.style'
import ProgressBar from '../utils/ProgressBar';

type Props = {
    backgroundColor: string
};

const HomeHeader: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    return (
        <View>
            <View style={[ style.header, { backgroundColor: props.backgroundColor } ]}>
                <Image style={style.image} source={require( '../../assets/logo/ipo-logo.png' )} />
                <Text style={{ color: Colors[ colorScheme ].text, fontWeight: 'bold', fontSize: 17 }}>Iloilo Population Office</Text>
            </View>
            <ProgressBar />
        </View>
    );
};

export default HomeHeader;
