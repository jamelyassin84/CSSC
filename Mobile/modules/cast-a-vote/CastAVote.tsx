
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <Presidential />
                <VPs />
                <Senatorial />
                <Governor />
                <Reps />
                <Mayors />
                <View style={{ height: 450 }} />
            </ScrollView>
        </Container>
    );
};

export default CastAVote;
