
import React, { FC } from 'react';
import { Image } from 'react-native';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HomeHeader from '../../components/headers/Home';
import LineUp from '../../components/lists/LineUp';
import Colors from '../../constants/Colors';
import Container from '../../constants/Layout';
import { collection } from '../../firebase/firebase';
import useTheme from '../../hooks/useColorScheme';
import { Collections } from '../../Models/Admin';
import { Candidate } from '../../Models/Candidtate';
import style from '../../styles/Vote.style'

type Props = {
    voted: boolean
    campus: string
};
const Voted: FC<Props> = ( props ) => {

    const mode = useTheme()

    const [ lineUp, setLineUp ] = React.useState<any>( [] )

    React.useEffect( () => {
        getLineUps()
    }, [] )

    const getLineUps = () => {
        collection( Collections.Votes ).get().then( ( snapShot ) => {
            let bets: string[] = []
            snapShot.forEach( ( doc ) => {
                const data = doc.data()[ 'bets' ]
                data.forEach( ( id: string ) => {
                    bets.push( id )
                } );
            } )
            let candidates: any = []
            let itemsProcessed = 0;
            bets.forEach( ( bet: string, index: number, array ) => {
                collection( Collections.Candidate ).doc( bet ).get().then( ( doc ) => {
                    itemsProcessed++
                    candidates.push( doc.data() )
                    if ( itemsProcessed === array.length ) {
                        newLineUps( candidates )
                    }
                } )
            } )
        } )
    }


    const newLineUps = ( candidates: Candidate[] ) => {
        setLineUp( candidates )
    }

    return (
        <View style={!props.voted ? { position: 'absolute', left: -500 } : {}}>
            <Container>
                <HomeHeader text={`CSSC ${ props.campus } Campus`} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={style.subtitle}>Your Line Up</Text>
                    {
                        lineUp.map( ( candidate: Candidate, index: number ) => (
                            <LineUp
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
                                        <Text style={{ fontSize: 14, color: 'gray' }}>{candidate.position}</Text>
                                        <View style={{ paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', marginVertical: 4, borderWidth: 1, borderColor: '#3AC48C' }}>
                                            <Text style={{ textAlign: 'center', color: '#3AC48C' }}>{candidate.partylist}</Text>
                                        </View>
                                        <Text style={{ fontSize: 11, color: 'gray' }}>{candidate.voter.department}-{candidate.voter.course} {candidate.voter.section}</Text>
                                    </>
                                }
                            />
                        ) )
                    }
                </ScrollView>
            </Container>
        </View>
    );
};

export default Voted;
