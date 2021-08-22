
import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import CandidateList from '../../../components/lists/CandidateList'
import { collection } from '../../../firebase/firebase'
import { Collections } from '../../../Models/Admin'
import { Candidate } from '../../../Models/Candidtate'
import { LineUpType } from '../../../Models/LineUp'
import style from '../../../styles/Vote.style'
import { existInVotes, position_is_in_votes, removeVote, toggleCard, warningAlert } from '../VoteProcesses'

type Props = {
    onVote: Function
}
const Senatorial: FC<Props> = ( props ) => {

    const [ candidates, setCandidates ] = React.useState<any>( [] )
    const [ votes, setvotes ] = React.useState<any>( [] )
    const [ voteNames, setVoteNames ] = React.useState<any>( {} )

    React.useEffect( () => {
        candidateList()
    }, [] )

    const candidateList = () => {
        collection( Collections.Candidate ).get().then( ( data: any ) => {
            let senators: Candidate[] = []
            let candidates: Candidate[] = []
            data.forEach( ( canndidate: any ) => {
                candidates.push( Object.assign( canndidate.data(), { id: canndidate.id } ) )
            } )
            candidates.forEach( ( candidate: Candidate ) => {
                if ( candidate.position === LineUpType.Senator ) {
                    senators.push( candidate )
                }
            } )
            setCandidates( senators )
        } )
    }

    const vote = ( candidate: Candidate ) => {
        if ( candidate.position === LineUpType.Senator ) {
            if ( position_is_in_votes( candidate, votes ) === 12 && !existInVotes( candidate, votes ) ) {
                return warningAlert( 1 )
            }
        }
        const name = toggleCard( candidate, voteNames )
        setVoteNames( { ...voteNames, name } )
        if ( !existInVotes( candidate, votes ) ) {
            let tempVotes = votes
            tempVotes.push( candidate )
            return setvotes( tempVotes )
        }
        setvotes( removeVote( candidate, votes ) )
        props.onVote( votes )
    }

    return (
        <View>
            <Text style={style.subtitle}>Senatorial Candidates</Text>
            {
                candidates.map( ( candidate: any, index: number ) => (
                    <CandidateList
                        key={index}
                        candidate={candidate}
                        left={
                            <Image style={style.image} source={
                                candidate.photo === undefined || null ? require( '../../../assets/avatar/face-7.jpg' ) :
                                    { uri: candidate.photo }
                            } />
                        }
                        center={
                            <>
                                <Text style={{ fontSize: 16 }}>{candidate.voter.name}</Text>
                                <Text style={{ color: 'white', textAlign: 'center', padding: 2, alignSelf: 'flex-start', backgroundColor: 'red', marginVertical: 4 }}>{candidate.position}</Text>
                                <Text style={{ fontSize: 14 }}>{candidate.voter.department}</Text>
                                <Text style={{ fontSize: 14, color: 'gray' }}>{candidate.voter.course}</Text>
                            </>
                        }
                        right={
                            <>
                                <Text style={{ marginBottom: 26, color: '#ccc', textAlign: 'right' }}>{candidate.voter.year} yr {candidate.voter.section}</Text>
                                <Text style={{ color: 'blue', textAlign: 'right' }}>{candidate.partylist}</Text>
                            </>
                        }
                        callback={() => vote( candidate )}
                        active={voteNames[ candidate.voter.name ]}
                    />
                ) )
            }
        </View>
    )
}

export default Senatorial
