
import React, { FC } from 'react'
import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
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
import Voted from '../officers/Voted'
import Loader from '../../components/utils/Loader'

type Props = {}
const CastAVote: FC<Props> = ( { route }: any ) => {

    const data = route.params

    const [ isLoading, setLoading ] = React.useState<boolean>( true )
    const [ voteIds, setVoteIds ] = React.useState<string[]>( [] )
    const [ hasVoted, setHasVoted ] = React.useState<boolean>( false )

    React.useEffect( () => {
        CheckVoterIfVoted()
    }, [] )

    const CheckVoterIfVoted = () => {
        setLoading( true )
        collection( Collections.Votes )
            .where( 'voter', '==', data.user_id )
            .get()
            .then( ( snapShot: any ) => {
                let temp = []
                snapShot.forEach( ( doc: any ) => {
                    temp.push( 1 )
                } );
                setHasVoted( temp.length !== 0 ? true : false )
                setLoading( false )
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

    const processCandidates = ( candidates: Candidate[] ) => {
        const temp = candidates.map( ( candidate: Candidate ) => {
            return candidate.id
        } )
        setVoteIds( [ ...voteIds, ...temp ] )
    }

    return (
        <>
            <Loader show={isLoading} />
            <Voted voted={isLoading === false && hasVoted === true} campus={data.campus} />
            <View
                style={hasVoted === false && isLoading === false ? { position: 'absolute', left: -500 } : {}
                }>
                <Container>
                    <HomeHeader text={`CSSC ${ data.campus } Campus`} />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Image
                            style={{ width: Dimensions.get( 'screen' ).width, resizeMode: 'contain', height: 200 }}
                            source={require( '../../assets/landing/election.png' )} />

                        <Presidential
                            onVote={( candidates: Candidate[] ) => processCandidates( candidates )}
                        />

                        <VPs
                            onVote={( candidates: Candidate[] ) => processCandidates( candidates )}
                        />

                        <Senatorial
                            onVote={( candidates: Candidate[] ) => processCandidates( candidates )}
                        />

                        <Governor
                            onVote={( candidates: Candidate[] ) => processCandidates( candidates )}
                        />

                        <Reps
                            onVote={( candidates: Candidate[] ) => processCandidates( candidates )}
                        />

                        <Mayors
                            onVote={( candidates: Candidate[] ) => processCandidates( candidates )}
                        />

                        <TouchableOpacity onPress={() => submitVote()} style={{ backgroundColor: '#FFC107', padding: 16, margin: 32 }}>
                            <Text style={{ textAlign: 'center' }}>Submit Vote</Text>
                        </TouchableOpacity>

                        <View style={{ height: 450 }} />

                    </ScrollView>
                </Container>
            </View>
        </>
    )
}

export default CastAVote
