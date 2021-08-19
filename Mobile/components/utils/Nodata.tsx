
import React, { FC } from 'react';
import { Text } from 'react-native';
import Container from '../../constants/Layout';

type Props = {};

const Nodata: FC<Props> = ( props ) => {
    return (
        <Container>
            <Text>Nodata</Text>
        </Container>
    );
};

export default Nodata;
