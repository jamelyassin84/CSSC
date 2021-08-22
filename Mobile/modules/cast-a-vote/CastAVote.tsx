
import React, { FC } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { collection } from '../../firebase/firebase'
import { Collections } from '../../Models/Admin'
import { Candidate } from '../../Models/Candidtate'
import HomeHeader from '../../components/headers/Home'
import Container from '../../constants/Layout'
import Governor from './candidates/Governor'
import Mayors from './candidates/Mayors'
import Presidential from './candidates/Presidential'
import Reps from './candidates/Reps'
import Senatorial from './candidates/Senatorial'
import VPs from './candidates/VPs'


type Props = {}
const CastAVote: FC<Props> = ( { route }: any ) => {

    const data = route.params

    const [ voteIds, setVoteIds ] = React.useState<string[]>( [] )
    const [ hasVoted, setHasVoted ] = React.useState<boolean>( false )

    const processCandidates = ( candidates: Candidate[] ) => {
        const temp = candidates.map( ( candidate: Candidate ) => {
            return candidate.id
        } )
        return temp
    }

    React.useEffect( () => {
        CheckVoterIfVoted()
    }, [] )

    const CheckVoterIfVoted = () => {
        collection( Collections.Votes )
            .where( 'voter', '==', data.user_id )
            .get()
            .then( ( snapShot: any ) => {
                let temp = []
                snapShot.forEach( ( doc: any ) => {
                    temp.push( 1 )
                } );
                setHasVoted( temp.length !== 0 ? true : false )
            } )
    }

    const submitVote = () => {
        Alert.alert(
            "Submit Vote?",
            "Are you sure you don't want to review your candidates?",
            [
                { text: "Cancel", },
                {
                    text: "OK", onPress: () => {
                        if ( voteIds.length === 0 ) {
                            return alert( 'Please vote atleast one candidate' )
                        }
                        let temp: string[] = []
                        for ( let id of voteIds ) {
                            if ( !temp.includes( id ) ) {
                                temp.push( id )
                            }
                        }
                        let vote: any = {}
                        vote[ 'bets' ] = temp
                        vote[ 'voter' ] = data.user_id
                        collection( Collections.Votes ).add( vote )
                        alert( 'You have successfully Voted' )
                        setHasVoted( true )
                        CheckVoterIfVoted()
                    }
                }
            ]
        )
    }

    return (
        <Container>
            <HomeHeader text={`CSSC ${ data.campus } Campus`} />
            <ScrollView showsVerticalScrollIndicator={false}
                style={hasVoted ? { position: 'absolute', left: '500' } : {}
                }>

                <Presidential onVote={( candidates: Candidate[] ) => setVoteIds( [ ...voteIds, ...processCandidates( candidates ) ] )} />

                <VPs onVote={( candidates: Candidate[] ) => setVoteIds( [ ...voteIds, ...processCandidates( candidates ) ] )} />

                <Senatorial onVote={( candidates: Candidate[] ) => setVoteIds( [ ...voteIds, ...processCandidates( candidates ) ] )} />

                <Governor onVote={( candidates: Candidate[] ) => setVoteIds( [ ...voteIds, ...processCandidates( candidates ) ] )} />

                <Reps onVote={( candidates: Candidate[] ) => setVoteIds( [ ...voteIds, ...processCandidates( candidates ) ] )} />

                <Mayors onVote={( candidates: Candidate[] ) => setVoteIds( [ ...voteIds, ...processCandidates( candidates ) ] )} />

                <TouchableOpacity onPress={() => submitVote()} style={{ backgroundColor: '#FFC107', padding: 16, margin: 32 }}>
                    <Text style={{ textAlign: 'center' }}>Submit Vote</Text>
                </TouchableOpacity>

                <View style={{ height: 450 }} />

            </ScrollView>
        </Container>
    )
}

export default CastAVote
