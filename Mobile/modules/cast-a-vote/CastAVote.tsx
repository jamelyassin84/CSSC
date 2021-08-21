
import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import HomeHeader from '../../components/headers/Home';
import Container from '../../constants/Layout';

type Props = {};

const CastAVote: FC<Props> = ( { route }: any ) => {

    const data = route.params

    return (
        <Container>
            <HomeHeader text={`CSSC ${ data.campus } Campus`} />
            <Text style={style.title}>Select Your Line-up!</Text>

            <Text style={style.subtitle}>Presidential Candidates</Text>
            <Text style={style.subtitle}>Vice Presidential  Candidates</Text>
            <Text style={style.subtitle}>Senatorial  Candidates</Text>
            <Text style={style.subtitle}>Candidates for Governor</Text>
            <Text style={style.subtitle}>Candidates for Representatives</Text>
            <Text style={style.subtitle}>Candidates for Mayors</Text>

        </Container>
    );
};

const style = StyleSheet.create( {
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
        color: 'red'
    },
    subtitle: {
        color: '#007BFF',
        margin: 20,

    }
} )

export default CastAVote;
