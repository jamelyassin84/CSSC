
import React, { FC } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HomeHeader from '../../components/headers/Home';
import Container from '../../constants/Layout';
import { Candidate } from '../../Models/Candidtate';
import Governor from './candidates/Governor';
import Mayors from './candidates/Mayors';
import Presidential from './candidates/Presidential';
import Reps from './candidates/Reps';
import Senatorial from './candidates/Senatorial';
import VPs from './candidates/VPs';

type Props = {};

const CastAVote: FC<Props> = ( { route }: any ) => {

    const data = route.params

    const [ voteIds, setVoteIds ] = React.useState<string[]>( [] )

    const processCandidates = ( candidates: Candidate[] ) => {
        const temp = candidates.map( ( candidate: Candidate ) => {
            return candidate.id
        } )
        return temp
    }

    const submitVote = () => {
        Alert.alert(
            "Submit Vote?",
            "Are you sure you don't want to review your candidates?",
            [
                { text: "Cancel", },
                {
                    text: "OK", onPress: () => {

                        let temp: string[] = []
                        for ( let id of voteIds ) {
                            if ( !temp.includes( id ) ) {
                                temp.push( id )
                            }
                        }
                        let vote: any = {}
                        vote[ 'bets' ] = temp
                        vote[ 'voter' ] = ''

                    }
                }
            ]
        )
    }

    return (
        <Container>
            <HomeHeader text={`CSSC ${ data.campus } Campus`} />
            <ScrollView showsVerticalScrollIndicator={false}>

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
    );
};

export default CastAVote;
