
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text } from 'react-native';
import HomeHeader from '../../components/headers/Home';
import DashboardPartylist from '../../components/party-list/DashboardPartylist';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Container from '../../constants/Layout';
import { collection } from '../../firebase/firebase';
import { Collections } from '../../Models/Admin';
import { PartyList } from '../../Models/Partylist';

type Props = {};

const Parties: FC<Props> = ( { route }: any ) => {

    const data = route.params

    const navigation = useNavigation()

    const [ isLoading, setLoading ] = React.useState( false )
    const [ parties, setparties ] = React.useState( [] )

    React.useEffect( () => {
        collection( Collections.Partylist ).onSnapshot( () => {
            onRefresh()
        } )
    }, [] )

    const onRefresh = () => {
        getPartylists()
    }

    const getPartylists = () => {
        setLoading( true )
        collection( Collections.Partylist )
            .where( 'campus', '==', data.campus )
            .get().then( ( snapshot ) => {
                let temp: any = []
                snapshot.forEach( ( doc: any ) => {
                    temp.push( doc.data() )
                } )
                setparties( temp )
                setLoading( false )
            } )
    }

    return (
        <Container>
            <HomeHeader text="Political Parties" />
            <WithRefreshComponent loading={isLoading} onRefresh={() => onRefresh}>
                {
                    parties.map( ( partylist: PartyList, index: number ) => (
                        <DashboardPartylist callback={() => {
                            navigation.navigate( 'Members',
                                {
                                    title: partylist.acronym,
                                    campus: data.campus
                                } )
                        }} key={index} partylist={partylist} />
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    ); ``
};

export default Parties;
