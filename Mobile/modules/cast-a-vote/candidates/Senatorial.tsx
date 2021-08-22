import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import CandidateList from '../../../components/lists/CandidateList'
import { collection } from '../../../firebase/firebase'
import { Collections } from '../../../Models/Admin'
import { Candidate } from '../../../Models/Candidtate'
import { LineUpType } from '../../../Models/LineUp'
import style from '../../../styles/Vote.style'
import { existInVotes, position_is_in_votes, removeVote, toggleCard, warningAlert } from '../VoteProcesses'
import Colors from '../../../constants/Colors'
import useTheme from '../../../hooks/useColorScheme'
import { PoliticalColors } from '../../../constants/AppConstants'

type Props = {
    onVote: Function
}
const Senatorial: FC<Props> = ( props ) => {

    const mode = useTheme()

    const [ candidates, setCandidates ] = React.useState<any>( [] )
    const [ votes, setvotes ] = React.useState<any>( [] )
    const [ voteNames, setVoteNames ] = React.useState<any>( {} )
    const [ parties, setparties ] = React.useState<any>( [] )

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
                if ( !parties.includes( candidate.partylist ) ) {
                    setparties( [ ...parties, candidate.partylist ] )
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
            setvotes( tempVotes )
        }
        if ( name === true ) {
            setvotes( removeVote( candidate, votes ) )
        }
        props.onVote( votes )
    }

    const resolveBorder = ( candidate: Candidate ) => {
        if ( candidate.partylist === parties[ 0 ] ) {
            return { borderColor: PoliticalColors[ 0 ], borderRadius: 3 }
        }
        if ( candidate.partylist === parties[ 1 ] ) {
            return { borderColor: PoliticalColors[ 1 ], borderRadius: 3 }
        }
        if ( candidate.partylist === parties[ 2 ] ) {
            return { borderColor: PoliticalColors[ 2 ], borderRadius: 3 }
        }
        return { borderColor: PoliticalColors[ 1 ], borderRadius: 3 }
    }

    const resolveText = ( candidate: Candidate ) => {
        if ( candidate.partylist === parties[ 0 ] ) {
            return { color: PoliticalColors[ 0 ] }
        }
        if ( candidate.partylist === parties[ 1 ] ) {
            return { color: PoliticalColors[ 1 ] }
        }
        if ( candidate.partylist === parties[ 2 ] ) {
            return { color: PoliticalColors[ 2 ] }
        }
        return { color: PoliticalColors[ 1 ] }
    }

    return (
        <View style={candidates.length === 0 ? { position: 'absolute', left: -500 } : {}}>
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
                                <Text style={{ fontSize: 16, color: Colors[ mode ].text }}>{candidate.voter.name}</Text>
                                <Text style={{ fontSize: 14, color: 'gray' }}>{candidate.position}</Text>
                                <View style={[ { paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', marginVertical: 4, borderWidth: 1 }, resolveBorder( candidate ) ]}>
                                    <Text style={[ { textAlign: 'center' }, resolveText( candidate ) ]}>{candidate.partylist}</Text>
                                </View>
                                <Text style={{ fontSize: 11, color: 'gray' }}>{candidate.voter.department}-{candidate.voter.course} {candidate.voter.section}</Text>
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
