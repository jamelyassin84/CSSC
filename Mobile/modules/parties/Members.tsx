
import React, { FC } from 'react';
import { Text } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Container from '../../constants/Layout';

type Props = {};

const Members: FC<Props> = ( { route }: any ) => {
    const data = route.params

    const [ isLoading, setLoading ] = React.useState( false )
    const [ campus, setCampus ] = React.useState( '' )

    const onRefresh = () => {
    }

    return (
        <Container>
            <CommonHeader title={data.title} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading}>

            </WithRefreshComponent>
        </Container>
    );
};

export default Members;
