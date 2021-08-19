
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Container from '../../constants/Layout';

type Props = {};

const SignIn: FC<Props> = ( props ) => {

    const navigation = useNavigation()

    return (
        <Container>
            <Image style={style.image} source={require( '../../assets/logo/trans-logo.png' )} />
            <Text style={style.title}>Cast your vote on your favorite electoral candidate!</Text>
            <Text style={{ textAlign: 'center' }}>Vote Wisely! <Text style={{ color: 'orange' }}>College Supreme Student Council</Text></Text>
            <View style={{ padding: 35 }}>
                <TextInput
                    clearButtonMode="always"
                    placeholderTextColor="orange"
                    style={style.input} placeholder="ID Number" />
                <TextInput
                    clearButtonMode="always"
                    placeholderTextColor="orange"
                    secureTextEntry={true}
                    style={style.input} placeholder="Section" />
                <TouchableOpacity style={[ style.button, { borderRadius: 30 } ]}>
                    <Text style={[ style.title, { padding: 5 } ]}>Vote Now!</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const style = StyleSheet.create( {
    image: {
        height: Dimensions.get( 'screen' ).height / 5.5,
        resizeMode: 'contain',
        width: Dimensions.get( 'screen' ).width,
        margin: 10
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        margin: 10,
        padding: 10
    },
    input: {
        borderRadius: 30,
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
        borderColor: 'rgba(150,150,150,.5)',
        fontWeight: 'bold',
        fontSize: 20,
    },
    button: {
        backgroundColor: 'orange',
        marginTop: 16
    }
} )

export default SignIn;
