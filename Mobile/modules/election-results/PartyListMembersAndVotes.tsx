import React, { FC } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { getPercent } from '../../constants/helpers'
import { collection } from '../../firebase/firebase'
import { Collections } from '../../Models/Admin'
import CommonHeader from '../../components/headers/CommonHeader'
import MemberAndVotesList from '../../components/lists/MemberAndVotesList'
import WithRefreshComponent from '../../components/utils/WithRefreshComponent'
import Container from '../../constants/Layout'
import Colors from '../../constants/Colors'
import useTheme from '../../hooks/useColorScheme'
import { sortCandidatesByPosition } from '../cast-a-vote/VoteProcesses'

type Props = {}
const PartyListMembersAndVotes: FC<Props> = ( { route }: any ) => {

    const mode = useTheme()
    const data = route.params

    const [ isLoading, setLoading ] = React.useState( false )
    const [ candidates, setcandidates ]: any = React.useState( [] )

    React.useEffect( () => {
        getCandidates()
        collection( Collections.Votes ).onSnapshot( () => {
            getCandidates()
        } )
        collection( Collections.Candidate ).onSnapshot( () => {
            getCandidates()
        } )
    }, [] )

    const onRefresh = () => {
        getCandidates()
    }

    const getCandidates = () => {
        setLoading( true )
        collection( Collections.Candidate )
            .where( 'partylist', '==', data.title )
            .get().then( ( snapshot ) => {
                let temp: any = []
                snapshot.forEach( ( doc: any ) => {
                    temp.push( Object.assign( doc.data(), { id: doc.id } ) )
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
                setcandidates( sortCandidatesByPosition( candidatesData ) )
                setLoading( false )
            } )
    }

    return (
        <Container>
            <CommonHeader title={data.title} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading}>
                {
                    candidates.map( ( candidate: any, index: number ) => (
                        <MemberAndVotesList
                            key={index}
                            image={
                                <Image style={style.image} source={
                                    candidate.photo === undefined || null ? require( '../../assets/avatar/face-7.jpg' ) :
                                        { uri: candidate.photo }
                                } />
                            }
                            body={
                                <>
                                    <Text style={{ fontSize: 16, color: Colors[ mode ].text }}>{candidate.voter.name}</Text>
                                    <Text style={{ color: '#28A745' }}>{candidate.position}</Text>
                                </>
                            }
                            values={
                                <>
                                    <Text style={{ color: '#ccc', textAlign: 'right' }}>{candidate.votes || 0}</Text>
                                    <Text style={{ color: '#28A745', fontWeight: 'bold', textAlign: 'right' }}>
                                        {getPercent( parseInt( candidate.votes || 0 ), parseInt( data.voters || 0 ) )}
                                        %</Text>
                                </>
                            }
                        />
                    ) )
                }
            </WithRefreshComponent>
        </Container>
    )
}

const style = StyleSheet.create( {
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'orange'
    }
} )

type VoteType = {
    bets: any[]
    voter: string
}


export default PartyListMembersAndVotes
