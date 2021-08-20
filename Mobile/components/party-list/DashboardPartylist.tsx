
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { PartyList } from '../../Models/Partylist';

type Props = {
    partylist: PartyList
};

const DashboardPartylist: FC<Props> = ( props ) => {

    return (
        <View>
            <Text>{props.partylist.acronym}</Text>
        </View>
    );
};

export default DashboardPartylist;
