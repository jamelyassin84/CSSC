import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import CandidateList from '../../../components/lists/CandidateList'
import { PoliticalColors } from '../../../constants/AppConstants'
import Colors from '../../../constants/Colors'
import { collection } from '../../../firebase/firebase'
import useTheme from '../../../hooks/useColorScheme'
import { Collections } from '../../../Models/Admin'
import { Candidate } from '../../../Models/Candidtate'
import { LineUpType } from '../../../Models/LineUp'
import { Voter } from '../../../Models/User'
import style from '../../../styles/Vote.style'
import { departmentExist, existInVotes, removeVote, resolveBorder, resolveText, sortCandidatByName, toggleCard, warningAlert } from '../VoteProcesses'

type Props = {
    onVote: Function
    user: Voter
}
const Reps: FC<Props> = ( props ) => {

    const mode = useTheme()

    const [ candidates, setCandidates ] = React.useState<any>( [] )
    const [ votes, setvotes ] = React.useState<any>( [] )
    const [ voteNames, setVoteNames ] = React.useState<any>( {} )
    const [ parties, setparties ] = React.useState<any>( [] )

    React.useEffect( () => {
        candidateList()
    }, [] )

    const candidateList = () => {
        collection( Collections.Candidate )
            .where( 'voter.department', '==', props.user.department )
            .where( 'voter.year', '==', props.user.year )
            .get().then( ( data: any ) => {
                let reps: Candidate[] = []
                let candidates: Candidate[] = []
                data.forEach( ( canndidate: any ) => {
                    candidates.push( Object.assign( canndidate.data(), { id: canndidate.id } ) )
                } )
                candidates.forEach( ( candidate: Candidate ) => {
                    if ( candidate.position === LineUpType.Representative ) {
                        reps.push( candidate )
                    }
                    if ( !parties.includes( candidate.partylist ) ) {
                        setparties( [ ...parties, candidate.partylist ] )
                    }
                } )
                setCandidates( sortCandidatByName( reps ) )
            } )
    }

    const vote = ( candidate: Candidate ) => {
        let name = undefined
        if ( existInVotes( candidate, votes ) ) {
            name = toggleCard( candidate, voteNames )
            props.onVote( removeVote( candidate, votes ) )
            setvotes( removeVote( candidate, votes ) )
        } else {
            if ( departmentExist( candidate, votes ) ) {
                warningAlert( 1 )
                return
            }
            name = toggleCard( candidate, voteNames )
            props.onVote( [ ...votes, candidate ] )
            setvotes( [ ...votes, candidate ] )
        }
        setVoteNames( { ...voteNames, name } )
    }


    return (
        <View style={candidates.length === 0 ? { position: 'absolute', left: -500 } : {}}>
            <Text style={style.subtitle}>Candidates for Representatives</Text>
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

export default Reps
