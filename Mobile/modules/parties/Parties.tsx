
import React, { FC } from 'react';
import { Text } from 'react-native';
import HomeHeader from '../../components/headers/Home';
import Container from '../../constants/Layout';

type Props = {};

const Parties: FC<Props> = ( props ) => {
    return (
        <Container>
            <HomeHeader text="Parties" />
        </Container>
    );
};

export default Parties;
