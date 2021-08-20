
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Container from '../../constants/Layout';
import { collection } from '../../firebase/firebase';
import { Collections } from '../../Models/Admin';
import { Candidate } from '../../Models/Candidtate';
import { PartyList } from '../../Models/Partylist';

type Props = {};

const Members: FC<Props> = ( { route }: any ) => {
    const data = route.params
    const [ isLoading, setLoading ] = React.useState( false )
    const [ party, setParty ] = React.useState<PartyList | any>( {} )
    const [ candidates, setCandidates ] = React.useState<Candidate[] | any>( [] )

    React.useEffect( () => {
        collection( Collections.Partylist ).onSnapshot( () => {
            onRefresh()
        } )
    }, [] )

    const onRefresh = () => {
        getPartylist()
    }

    const getPartylist = () => {
        setLoading( true )
        collection( Collections.Partylist )
            .where( 'campus', '==', data.campus )
            .get().then( ( snapshot ) => {
                snapshot.forEach( ( doc: any ) => {
                    setParty( Object.assign( doc.data(), { id: doc.id } ) )
                } )
                setLoading( false )
                getCandidates()
            } )
    }

    const getCandidates = () => {
        collection( Collections.Candidate ).where( 'partylist', '==', data.title )
            .get().then( ( snapshot: Candidate[] | any ) => {
                let temp: any = []
                snapshot.forEach( ( doc: any ) => {
                    temp.push( Object.assign( doc.data(), { id: doc.id } ) )
                } )
                setCandidates( temp )
            } )
    }

    return (
        <Container>
            <CommonHeader title={data.title} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={style.title}>English Title</Text>
                    <Text style={style.subtitle}>{party.english_title} </Text>

                    <Text style={style.title}>Filpino Title</Text>
                    <Text style={style.subtitle}>{party.filipino_title} </Text>

                    <Text style={style.title}>Platform</Text>
                    <Text style={style.subtitle}>{party.platform}</Text>

                    <Text style={style.title}>Members</Text>
                    {

                    }

                </View>

            </WithRefreshComponent>
        </Container>
    );
};

const style = StyleSheet.create( {
    title: {
        color: 'gray',
        marginTop: 26
    },
    subtitle: {
        color: 'orange',
        fontSize: 20,
        fontWeight: 'bold'
    },
} )

export default Members;
