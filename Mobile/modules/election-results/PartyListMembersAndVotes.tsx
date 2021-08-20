
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FC } from 'react';
import CommonHeader from '../../components/headers/CommonHeader';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import Container from '../../constants/Layout';
import { collection } from '../../firebase/firebase';
import { Collections } from '../../Models/Admin';

type Props = {};

const PartyListMembersAndVotes: FC<Props> = ( { route }: any ) => {
    const data = route.params

    const [ isLoading, setLoading ] = React.useState( false )
    const [ candidates, setcandidates ]: any = React.useState( [] )

    React.useEffect( () => {
        getCandidates()
    }, [] )

    const onRefresh = () => {
        getCandidates()
    }

    const getCandidates = () => {
        setLoading( true )
        collection( Collections.Candidate )
            .where( 'partylist', '==', data.title )
            .onSnapshot( ( snapshot ) => {
                let temp: any = []
                snapshot.forEach( ( doc: any ) => {
                    temp.push( doc.data() )
                } )
                setcandidates( temp )
                processVotes()
            } )
    }

    const processVotes = () => {
        collection( Collections.Votes )
            .onSnapshot( ( snapshot: any ) => {
                let temp: any = []
                snapshot.forEach( ( doc: any ) => {
                    temp.push( Object.assign( doc.data(), doc.id ) )
                } )
                const votes: VoteType[] = temp
                for ( let index in candidates ) {
                    candidates[ index ].votes = 0
                    votes.forEach( ( vote: VoteType ) => {
                        vote.bets.forEach( ( candidate_id: string ) => {
                            if ( candidate_id === candidates[ index ].id ) {
                                candidates[ index ].votes += 1
                            }
                        } )
                    } )
                    setLoading( false )
                }
            } )
    }

    return (
        <Container>
            <CommonHeader title={data.title} />
            <WithRefreshComponent loading={isLoading} onRefresh={() => onRefresh}>

            </WithRefreshComponent>
        </Container>
    );
};

type VoteType = {
    bets: any[]
    voter: string
}


export default PartyListMembersAndVotes;
