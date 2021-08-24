
import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import CandidateList from '../../../components/lists/CandidateList'
import { collection } from '../../../firebase/firebase'
import { Collections } from '../../../Models/Admin'
import { Candidate } from '../../../Models/Candidtate'
import { LineUpType } from '../../../Models/LineUp'
import style from '../../../styles/Vote.style'
import { existInVotes, position_is_in_votes, removeVote, resolveBorder, resolveText, sortCandidatByName, toggleCard, warningAlert } from '../VoteProcesses'
import Colors from '../../../constants/Colors'
import useTheme from '../../../hooks/useColorScheme'

type Props = {
    onVote: Function
}
const Presidential: FC<Props> = ( props ) => {

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
            let presidents: Candidate[] = []
            let candidates: Candidate[] = []
            data.forEach( ( canndidate: any ) => {
                candidates.push( Object.assign( canndidate.data(), { id: canndidate.id } ) )
            } )
            candidates.forEach( ( candidate: Candidate ) => {
                if ( !parties.includes( candidate.partylist ) ) {
                    setparties( [ ...parties, candidate.partylist ] )
                }
                if ( candidate.position === LineUpType.President ) {
                    presidents.push( candidate )
                }
            } )
            setCandidates( sortCandidatByName( presidents ) )
        } )
    }

    const vote = ( candidate: Candidate ) => {
        if ( candidate.position === LineUpType.President ) {
            if ( position_is_in_votes( candidate, votes ) === 1 && !existInVotes( candidate, votes ) ) {
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

    return (
        <View style={candidates.length === 0 ? { position: 'absolute', left: -500 } : {}}>
            <Text style={style.subtitle}>Presidential Candidates</Text>
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
                                <View style={[ { paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', marginVertical: 4, borderWidth: 1 }, resolveBorder( candidate, parties ) ]}>
                                    <Text style={[ { textAlign: 'center' }, resolveText( candidate, parties ) ]}>{candidate.partylist}</Text>
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

export default Presidential
