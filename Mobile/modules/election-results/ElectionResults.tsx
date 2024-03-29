import React, { FC } from 'react'
import { AntDesign, Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { collection } from '../../firebase/firebase'
import { Collections } from '../../Models/Admin'
import { PartyList } from '../../Models/Partylist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeHeader from '../../components/headers/Home'
import DashboardPartylist from '../../components/party-list/DashboardPartylist'
import Summaries from '../../components/summaries/Summaries'
import WithRefreshComponent from '../../components/utils/WithRefreshComponent'
import Container from '../../constants/Layout'

type Props = {}
const ElectionResults: FC<Props> = ( { route }: any ) => {

    const data = route.params

    const navigation = useNavigation()

    const [ isLoading, setLoading ] = React.useState( false )
    const [ partylists_data, setpartylists_data ] = React.useState<PartyList[]>( [] )
    const [ partylists, setpartylists ] = React.useState( 0 )
    const [ candidates, setcandidates ] = React.useState( 0 )
    const [ voters, setvoters ] = React.useState( 0 )
    const [ voted, setvoted ] = React.useState( 0 )

    React.useEffect( () => {
        collection( Collections.Partylist ).onSnapshot( () => {
            onRefresh()
        } )
        collection( Collections.Candidate ).onSnapshot( () => {
            onRefresh()
        } )
        collection( Collections.Voters ).onSnapshot( () => {
            onRefresh()
        } )
        collection( Collections.Votes ).onSnapshot( () => {
            onRefresh()
        } )
    }, [] )

    const onRefresh = () => {
        getPartylists()
        getCandidates()
        getVoters()
        getVoted()
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
                setpartylists_data( temp.sort( ( a: PartyList, b: PartyList ) => a.acronym.localeCompare( b.acronym ) ) )
                setpartylists( temp.length )
            } )
    }

    const getCandidates = () => {
        collection( Collections.Candidate )
            .get().then( ( snapshot ) => {
                let temp: any = []
                snapshot.forEach( ( doc: any ) => {
                    temp.push( doc.data() )
                } )
                setcandidates( temp.length )
            } )
    }

    const getVoters = () => {
        collection( Collections.Voters )
            .where( 'campus', '==', data.campus )
            .get().then( ( snapshot ) => {
                let temp: any = []
                snapshot.forEach( ( doc: any ) => {
                    temp.push( doc.data() )
                } )
                setvoters( temp.length )
            } )
    }

    const getVoted = () => {
        collection( Collections.Votes )
            .get().then( ( snapshot ) => {
                let temp: any = []
                snapshot.forEach( ( doc: any ) => {
                    temp.push( doc.data() )
                } )
                setvoted( temp.length )
                setLoading( false )
            } )
    }

    return (
        <Container>
            <HomeHeader text={`CSSC ${ data.campus } Campus`} />
            <WithRefreshComponent loading={isLoading} onRefresh={() => onRefresh}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Summaries
                        title="Political Parties"
                        value={partylists}
                        backgroundColor="rgba(255, 193, 7,.2)"
                        icon={<FontAwesome name="list-ol" size={24} color="rgba(255, 193, 7,1)" />}
                    />
                    <Summaries
                        title="Total Candidates"
                        value={candidates}
                        backgroundColor="rgba(40, 167, 69,.2)"
                        icon={<Feather name="users" size={24} color="rgba(40, 167, 69,1)" />}
                    />
                    <Summaries
                        title="Registered Voters"
                        value={voters}
                        backgroundColor="rgba(0, 123, 255,.2)"
                        icon={<AntDesign name="user" size={24} color="rgba(0, 123, 255,1)" />}
                    />
                    <Summaries
                        title="Voted"
                        value={voted}
                        backgroundColor="rgba(220, 53, 69,.2)"
                        icon={<FontAwesome5 name="vote-yea" size={24} color="rgba(220, 53, 69,1)" />}
                    />
                </ScrollView>
                <Text style={{ padding: 16 }}>Parties</Text>
                {
                    partylists_data.map( ( partylist: PartyList, index: number ) => (
                        <DashboardPartylist callback={() => {
                            navigation.navigate( 'PartyListMembersAndVotes',
                                {
                                    title: partylist.acronym,
                                    voters: voters
                                } )
                        }} key={index} partylist={partylist} />
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    )
}

export default ElectionResults
