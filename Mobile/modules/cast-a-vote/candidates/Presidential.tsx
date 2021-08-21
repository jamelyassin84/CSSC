
import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CandidateList from '../../../components/lists/CandidateList';
import { collection } from '../../../firebase/firebase';
import { Collections } from '../../../Models/Admin';
import { Candidate } from '../../../Models/Candidtate';
import { LineUpType } from '../../../Models/LineUp';
import { style } from '../CastAVote';
import { getCandidates } from '../VoteActions';

type Props = {
    ids?: string[]
};

const Presidential: FC<Props> = ( props ) => {

    const [ candidates, setCandidates ] = React.useState<any>( [] )

    React.useEffect( () => {
        candidateList()
    }, [] )

    const candidateList = () => {
        collection( Collections.Candidate ).get().then( ( data: any ) => {
            let presidents: Candidate[] = []
            let candidates: Candidate[] = []
            data.forEach( ( canndidate: any ) => {
                candidates.push( Object.assign( canndidate.data(), { id: canndidate.id } ) )
            } );
            candidates.forEach( ( candidate: Candidate ) => {
                if ( candidate.position === LineUpType.President ) {
                    presidents.push( candidate )
                }
            } )
            setCandidates( presidents )
        } )

    }

    const renderItem = ( { item }: any ) => (
        <CandidateList
            candidate={item}
            left={
                <Image style={style.image} source={
                    item.photo === undefined || null ? require( '../../../assets/avatar/face-7.jpg' ) :
                        { uri: item.photo }
                } />
            }
            center={
                <>
                    <Text style={{ fontSize: 16 }}>{item.voter.name}</Text>
                    <Text style={{ color: '#28A745' }}>{item.position}</Text>
                    <Text style={{ fontSize: 14 }}>{item.voter.department}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>{item.voter.course}</Text>
                </>
            }
            right={
                <>
                    <Text style={{ fontSize: 16, marginBottom: 16 }}>{item.voter.year} Year {item.voter.section}</Text>
                    <Text style={{ color: 'red', borderWidth: 1, textAlign: 'center', padding: 5, borderColor: 'red' }}>{item.partylist}</Text>

                </>
            }
            callback={() => alert( ' ma select' )}
        />
    )

    return (
        <View>
            <Text style={style.subtitle}>Presidential Candidates</Text>
            <FlatList data={candidates} renderItem={renderItem} keyExtractor={item => item.id} />
        </View>
    );
};

export default Presidential;
