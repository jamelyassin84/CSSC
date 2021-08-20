
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Container from '../../constants/Layout';
import { collection } from '../../firebase/firebase';
import { Collections } from '../../Models/Admin';
import { Voter } from '../../Models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const SignIn: FC<Props> = ( props ) => {

    const [ isLoading, setLoading ] = React.useState( false )
    const [ hasError, sethasError ] = React.useState( false )
    const [ IDnumber, setIDnumber ] = React.useState( '' )
    const [ Section, setSection ] = React.useState( '' )
    const navigation = useNavigation()

    const voteNow = () => {
        setLoading( true )
        if ( IDnumber === '' || Section === '' ) {
            sethasError( true )
            setLoading( false )
            return
        }
        collection( Collections.Voters )
            .where( 'id_number', '==', IDnumber )
            .where( 'section', '==', Section ).get()
            .then( async ( data: any ) => {
                if ( data.empty ) {
                    alert(
                        'Sorry, We could not find a student associated with this ID Number and Section',
                    )
                    setLoading( false )
                    return
                }
                data.forEach( ( doc: any ) => {
                    data = Object.assign( { id: doc.id }, doc.data() )
                } )
                let user: Voter | any = data
                await AsyncStorage.setItem( 'user', JSON.stringify( user ) )
                navigation.navigate( 'ElectionResults' )
                setLoading( false )
            } )
    }

    return (
        <Container>
            <Image style={style.image} source={require( '../../assets/logo/trans-logo.png' )} />
            <Text style={style.title}>Cast your vote on your favorite electoral candidate!</Text>
            <Text style={{ textAlign: 'center' }}>Vote Wisely! <Text style={{ color: 'orange' }}>College Supreme Student Council</Text></Text>
            <View style={{ padding: 35 }}>

                <TextInput
                    clearButtonMode="always"
                    placeholderTextColor="orange"
                    onChangeText={( text: string ) => setIDnumber( text )}
                    style={style.input} placeholder="ID Number" />

                <TextInput
                    clearButtonMode="always"
                    placeholderTextColor="orange"
                    secureTextEntry={true}
                    onChangeText={( text: string ) => setSection( text )}
                    style={style.input} placeholder="Section" />

                <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>
                    {
                        hasError ? 'One or more fields should not be empty!' : ''
                    }
                </Text>

                <TouchableOpacity disabled={isLoading}
                    onPress={() => voteNow()}
                    style={[ style.button, { borderRadius: 30 } ]}>
                    <Text style={[ style.title, { padding: 5 } ]}>
                        {
                            isLoading ? 'please wait..' : 'Vote Now!'
                        }
                    </Text>
                </TouchableOpacity>

            </View>
            <Text style={{ position: 'absolute', bottom: 20, textAlign: 'center', width: '100%' }}>All Rights Reserved: Powered By: <Text style={{ color: 'orange' }}>Jamel Eid Yassin</Text></Text>
        </Container>
    );
};

const style = StyleSheet.create( {
    image: {
        height: Dimensions.get( 'screen' ).height / 5.5,
        resizeMode: 'contain',
        width: Dimensions.get( 'screen' ).width,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        margin: 10,
        padding: 20
    },
    input: {
        borderRadius: 30,
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
        borderColor: 'rgba(150,150,150,.2)',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'orange',
        marginTop: 16
    }
} )

export default SignIn;
