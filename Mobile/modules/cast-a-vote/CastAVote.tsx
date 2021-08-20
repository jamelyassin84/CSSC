
import React, { FC } from 'react';
import { Text } from 'react-native';
import HomeHeader from '../../components/headers/Home';
import Container from '../../constants/Layout';

type Props = {};

const CastAVote: FC<Props> = ( props ) => {
    return (
        <Container>
            <HomeHeader text="Cast your Vote!" />
            <Text>CastAVote</Text>
        </Container>
    );
};

export default CastAVote;
