
import React, { FC } from 'react'
import { Text } from 'react-native'
import HomeHeader from '../../components/headers/Home'
import WithRefreshComponent from '../../components/utils/WithRefreshComponent'
import Container from '../../constants/Layout'
import { collection } from '../../firebase/firebase'
import { Collections } from '../../Models/Admin'
import { Candidate } from '../../Models/Candidtate'
import { LineUpType } from '../../Models/LineUp'
import { sortCandidatByName, sortCandidatesByPosition } from '../cast-a-vote/VoteProcesses'
import firebase from 'firebase'
import { VoteType } from '../election-results/PartyListMembersAndVotes'
import OfficerList from '../../components/lists/OfficerList'

type Props = {}
const Officers: FC<Props> = ( { route }: any ) => {

    const data = route.params

    const [ isLoading, setLoading ] = React.useState( false )
    const [ candidates, setcandidates ] = React.useState<Candidate[] | any>( [] )

    React.useEffect( () => {
        collection( Collections.Votes ).onSnapshot( () => {
            onRefresh()
        } )
    }, [] )

    const onRefresh = async () => {
        getCandidates()
    }

    const getCandidates = () => {
        setLoading( true )
        let temp: Candidate[] = []
        collection( Collections.Candidate ).get().then( ( snapShot ) => {
            snapShot.forEach( ( candidate: any ) => {
                temp.push( Object.assign( candidate.data(), { id: candidate.id } ) )
            } )
            processVotes( temp )
        } )
    }

    const processVotes = ( candidatesData: any[] ) => {
        collection( Collections.Votes )
            .get().then( ( snapshot: any ) => {
                let temp: any = []
                snapshot.forEach( ( doc: any ) => {
                    temp.push( Object.assign( doc.data(), { id: doc.id } ) )
                } )
                const votes: VoteType[] = temp
                for ( let index in candidatesData ) {
                    candidatesData[ index ].votes = 0
                    votes.forEach( ( vote: VoteType ) => {
                        vote.bets.forEach( ( candidate_id: string ) => {
                            if ( candidate_id === candidatesData[ index ].id ) {
                                candidatesData[ index ].votes += 1
                            }
                        } )
                    } )
                }
                processCandidates( sortCandidatesByPosition( candidatesData ) )
            } )
    }

    const processCandidates = ( candidatesData: any[] ) => {
        let president: any = {}
        let vp: any = {}
        let senators: any[] = []
        let govs: any[] = []
        let reps: any[] = []
        let mayors: any[] = []
        candidatesData.forEach( ( candidate: any ) => {
            if ( candidate.position === LineUpType.President ) {
                if ( candidate.votes > president.votes || president.votes === undefined ) {
                    president = candidate
                }
            }
            if ( candidate.position === LineUpType.VP ) {
                if ( candidate.votes > vp.votes || vp.votes === undefined ) {
                    vp = candidate
                }
            }
            if ( candidate.position === LineUpType.Senator ) {
                senators.push( candidate )
            }
            if ( candidate.position === LineUpType.Governor ) {
                govs.push( candidate )
            }
            if ( candidate.position === LineUpType.Representative ) {
                reps.push( candidate )
            }
            if ( candidate.position === LineUpType.Mayor ) {
                mayors.push( candidate )
            }
        } )
        senators = senators.sort( ( a: any, b: any ) => a.votes + b.votes ).splice( 0, 12 )
        govs = govs.sort( ( a: any, b: any ) => a.votes + b.votes ).splice( 0, 4 )
        reps = reps.sort( ( a: any, b: any ) => a.votes + b.votes ).splice( 0, 4 )
        mayors = mayors.sort( ( a: any, b: any ) => a.votes + b.votes ).splice( 0, 4 )
        setcandidates( sortCandidatesByPosition( [ ...[], president, vp, ...senators ] ) )
        setLoading( false )
    }

    return (
        <Container>
            <HomeHeader text={`CSSC ${ data.campus } Campus`} />
            <WithRefreshComponent loading={isLoading} onRefresh={() => onRefresh}>
                {
                    candidates.map( ( candidate: any, index: number ) => (
                        <OfficerList candidate={candidate} key={index} />
                    ) )
                }
                <Text></Text>
            </WithRefreshComponent>
        </Container>
    )
}

export default Officers
