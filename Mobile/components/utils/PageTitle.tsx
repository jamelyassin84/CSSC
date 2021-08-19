
import React, { FC } from 'react';
import { Text } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {
    title: string
};

const PageTitle: FC<Props> = ( props ) => {
    const colorScheme = useColorScheme();
    return <Text style={{ fontSize: 30, padding: 15, fontWeight: 'bold', color: Colors[ colorScheme ].text }}>{props.title}</Text>
};

export default PageTitle;
