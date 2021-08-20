
import React, { FC } from 'react';
import { Text, View, Image } from 'react-native';
import style from '../../styles/header/header.style'
import ProgressBar from '../utils/ProgressBar';

type Props = {
};

const HomeHeader: FC<Props> = ( props ) => {
    return (
        <View>
            <View style={[ style.header, { backgroundColor: 'white' } ]}>
                <Image style={style.image} source={require( '../../assets/logo/trans-logo.png' )} />
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>College Supreme Student Council</Text>
            </View>
            <ProgressBar />
        </View>
    );
};

export default HomeHeader;
