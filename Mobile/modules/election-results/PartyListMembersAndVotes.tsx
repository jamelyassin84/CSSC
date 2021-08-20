
import React, { FC } from 'react';
import CommonHeader from '../../components/headers/CommonHeader';
import Column from '../../components/utils/table/Column';
import Row from '../../components/utils/table/Row';
import Tbody from '../../components/utils/table/Tbody';
import Thead from '../../components/utils/table/Thead';
import WithRefreshComponent from '../../components/utils/WithRefreshComponent';
import { getPercent } from '../../constants/helpers';
import Container from '../../constants/Layout';
import { collection } from '../../firebase/firebase';
import { Collections } from '../../Models/Admin';
import { Candidate } from '../../Models/Candidtate';

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
                    let object = candidates
                    object[ index ].votes = 0
                    votes.forEach( ( vote: VoteType ) => {
                        vote.bets.forEach( ( candidate_id: string ) => {
                            if ( candidate_id === candidates[ index ].id ) {
                                object[ index ].votes += 1
                            }
                        } )
                    } )
                    setcandidates( object )
                    setLoading( false )
                }
            } )
    }

    return (
        <Container>
            <CommonHeader title={data.title} />
            <WithRefreshComponent loading={isLoading} onRefresh={() => onRefresh}>
                <Thead
                    headers={[
                        'Candidate',
                        'Votes',
                        'Percentage',
                    ]}
                />
                <Tbody >
                    {
                        candidates.map( ( candidate: any, index: number ) => (
                            <>
                                <Row key={index}>
                                    <Column>{candidate.voter.name}</Column>
                                    <Column>{candidate.votes}</Column>
                                    <Column>{getPercent( candidate.voter.name, data.voters )}</Column>
                                </Row>

                            </>

                        ) )
                    }
                </Tbody>
            </WithRefreshComponent>
        </Container>
    );
};



type VoteType = {
    bets: any[]
    voter: string
}


export default PartyListMembersAndVotes;
