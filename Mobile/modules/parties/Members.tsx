
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import MemberList from '../../components/lists/MemberList';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Container from '../../constants/Layout';
import { collection } from '../../firebase/firebase';
import { Collections } from '../../Models/Admin';
import { Candidate } from '../../Models/Candidtate';
import { PartyList } from '../../Models/Partylist';

type Props = {};

const Members: FC<Props> = ( { route }: any ) => {

    const navigation = useNavigation()

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

                        candidates.map( ( candidate: Candidate, index: any ) => (
                            <MemberList
                                key={index}
                                left={
                                    <Image style={style.image} source={
                                        candidate.photo === undefined || null ? require( '../../assets/avatar/face-7.jpg' ) :
                                            { uri: candidate.photo }
                                    } />
                                }
                                center={
                                    <>
                                        <Text style={{ fontSize: 16 }}>{candidate.voter.name}</Text>
                                        <Text style={{ color: '#28A745' }}>{candidate.position}</Text>
                                        <Text style={{ fontSize: 14 }}>{candidate.voter.department}</Text>
                                        <Text style={{ fontSize: 14, color: 'gray' }}>{candidate.voter.course}</Text>
                                    </>
                                }
                                right={
                                    <>
                                        <Text style={{ fontSize: 16 }}>{candidate.voter.year} Year</Text>
                                        <Text style={{ color: '#28A745' }}>{candidate.voter.section}</Text>
                                    </>
                                }
                                callback={() => navigation.navigate( 'ViewPlatform', {
                                    voter_id: candidate.voter.id,
                                    name: candidate.voter.name,
                                    style: style,
                                } )}
                            />
                        ) )
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
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'orange'
    }
} )

export default Members;
