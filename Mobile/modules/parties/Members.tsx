import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import CommonHeader from '../../components/headers/CommonHeader'
import MemberList from '../../components/lists/MemberList'
import WithRefreshComponent from '../../components/utils/WithRefreshComponent'
import Colors from '../../constants/Colors'
import Container from '../../constants/Layout'
import { collection } from '../../firebase/firebase'
import useTheme from '../../hooks/useColorScheme'
import { Collections } from '../../Models/Admin'
import { Candidate } from '../../Models/Candidtate'
import { LineUpType } from '../../Models/LineUp'
import { PartyList } from '../../Models/Partylist'
import { sortCandidatByName, sortCandidatesByPosition } from '../cast-a-vote/VoteProcesses'

type Props = {}
const Members: FC<Props> = ( { route }: any ) => {

    const mode = useTheme()
    const navigation = useNavigation()

    const data = route.params
    const [ isLoading, setLoading ] = React.useState( false )
    const [ party, setParty ] = React.useState<PartyList | any>( {} )
    const [ candidates, setCandidates ] = React.useState<Candidate[] | any>( [] )

    React.useEffect( () => {
        collection( Collections.Partylist ).onSnapshot( () => {
            onRefresh()
        } )
        collection( Collections.Candidate ).onSnapshot( () => {
            onRefresh()
        } )
    }, [] )

    const onRefresh = () => {
        getPartylist()
    }

    const getPartylist = () => {
        setLoading( true )
        collection( Collections.Partylist )
            .where( 'campus', '==', data.campus )
            .get().then( ( snapshot ) => {
                snapshot.forEach( ( doc: any ) => {
                    setParty( Object.assign( doc.data(), { id: doc.id } ) )
                } )
                setLoading( false )
                getCandidates()
            } )
    }

    const getCandidates = () => {
        collection( Collections.Candidate ).where( 'partylist', '==', data.title )
            .get().then( ( snapshot: Candidate[] | any ) => {
                let temp: any = []
                snapshot.forEach( ( doc: any ) => {
                    temp.push( Object.assign( doc.data(), { id: doc.id } ) )
                } )
                setCandidates( sortCandidatesByPosition( temp ) )
            } )
    }

    return (
        <Container>
            <CommonHeader title={data.title} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[ style.subtitle, { color: Colors[ mode ].text } ]}>English Title</Text>
                    <Text style={style.title}>{party.english_title} </Text>

                    <Text style={[ style.subtitle, { color: Colors[ mode ].text } ]}>Filpino Title</Text>
                    <Text style={style.title}>{party.filipino_title} </Text>

                    <Text style={[ style.subtitle, { color: Colors[ mode ].text } ]}>Platform</Text>
                    <Text style={style.title}>{party.platform}</Text>

                    <Text style={[ style.subtitle, { color: Colors[ mode ].text } ]}>{data.title} Members</Text>
                    {

                        candidates.map( ( candidate: Candidate, index: any ) => (
                            <MemberList
                                key={index}
                                left={
                                    <Image style={style.image} source={
                                        candidate.photo === undefined || null ? require( '../../assets/avatar/face-7.jpg' ) :
                                            { uri: candidate.photo }
                                    } />
                                }
                                center={
                                    <>
                                        <Text style={{ fontSize: 16, color: Colors[ mode ].text }}>{candidate.voter.name}</Text>
                                        <Text style={{ color: 'red' }}>{candidate.position}</Text>
                                        <Text style={{ fontSize: 14, color: 'gray' }}>{candidate.voter.department}-{candidate.voter.course} {candidate.voter.year} year{candidate.voter.section}</Text>
                                    </>
                                }
                                callback={() => navigation.navigate( 'ViewPlatform', {
                                    voter_id: candidate.voter.id,
                                    name: candidate.voter.name,
                                    style: style,
                                } )}
                            />
                        ) )
                    }
                </View>
            </WithRefreshComponent>
        </Container>
    )
}

const style = StyleSheet.create( {
    title: {
        color: 'gray',
        paddingHorizontal: 32,
        lineHeight: 32
    },
    subtitle: {
        marginTop: 26,
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'orange'
    }
} )

export default Members
