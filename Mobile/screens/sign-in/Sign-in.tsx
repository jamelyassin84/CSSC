
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    Keyboard
} from 'react-native';
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
        Keyboard.dismiss()
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
                let user: Voter = data
                await AsyncStorage.setItem( 'user', JSON.stringify( user ) )
                navigation.navigate( 'ElectionResults', { campus: user.campus, user_id: user.id } )
                setLoading( false )
            } )
            .catch( () => {
                alert( 'Oops! There is something wrong with your connection. Try Again' )
            } )
    }

    return (
        <Container>
            <KeyboardAvoidingView
                keyboardVerticalOffset={-150}
                behavior={Platform.OS == 'ios' ? 'position' : 'height'}
                style={{ flex: 1 }}
            >
                <Text style={style.title}><Text style={{ color: '#FFC107' }} >Answer</Text> the call of time! {'\n'}
                    <Text style={{ color: '#FFC107' }} >Exercise</Text> your right to <Text style={{ color: 'white', backgroundColor: '#FFC107' }}> vote! </Text>
                </Text>
                <Text style={{ textAlign: 'center' }}>Your vote matters! {'\n'} <Text style={{ color: '#FFC107' }}>College Supreme Student Council</Text></Text>
                <Image style={style.image} source={require( '../../assets/landing/bg1.png' )} />

                <View style={{ padding: 35 }}>
                    <TextInput
                        clearButtonMode="always"
                        placeholderTextColor="#ccc"
                        value={IDnumber}
                        onChangeText={( text: string ) => setIDnumber( text.toUpperCase() )}
                        style={style.input} placeholder="ID Number" />

                    <TextInput
                        clearButtonMode="always"
                        placeholderTextColor="#ccc"
                        secureTextEntry={true}
                        value={Section}
                        onChangeText={( text: string ) => setSection( text.toUpperCase() )}
                        style={style.input} placeholder="Section" />

                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
                        {
                            hasError ? 'One or more fields should not be empty!' : ''
                        }
                    </Text>
                    <TouchableOpacity disabled={isLoading}
                        onPress={() => voteNow()}
                        style={[ style.button, { borderRadius: 30 } ]}>
                        <Text style={[ style.title, { padding: 5, color: 'white' } ]}>
                            {
                                isLoading ? 'please wait..' : 'Vote Now!'
                            }
                        </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
            <Text style={{ position: 'absolute', bottom: 20, textAlign: 'center', width: '100%' }}>All Rights Reserved. Powered By: <Text style={{ color: 'orange' }}>Jamel Eid Yassin</Text></Text>
        </Container>
    );
};

const style = StyleSheet.create( {
    image: {
        height: Dimensions.get( 'screen' ).height / 4.5,
        resizeMode: 'contain',
        width: Dimensions.get( 'screen' ).width,
        marginTop: 40,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        margin: 5,
        padding: 20
    },
    input: {
        borderRadius: 30,
        borderWidth: 1,
        padding: 10,
        marginBottom: 16,
        borderColor: 'rgba(150,150,150,.2)',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#FFC107',
        marginTop: 16
    }
} )

export default SignIn;
