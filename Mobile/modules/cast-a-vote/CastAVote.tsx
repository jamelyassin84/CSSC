
import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import HomeHeader from '../../components/headers/Home';
import Container from '../../constants/Layout';
import Governor from './candidates/Governor';
import Mayors from './candidates/Mayors';
import Presidential from './candidates/Presidential';
import Reps from './candidates/Reps';
import Senatorial from './candidates/Senatorial';
import VPs from './candidates/VPs';

type Props = {};

const CastAVote: FC<Props> = ( { route }: any ) => {

    const data = route.params

    return (
        <Container>
            <HomeHeader text={`CSSC ${ data.campus } Campus`} />
            <Text style={style.title}>Select Your Line-up!</Text>

            <Presidential />
            <VPs />
            <Senatorial />
            <Governor />
            <Reps />
            <Mayors />

        </Container>
    );
};

export const style = StyleSheet.create( {
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
