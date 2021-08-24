import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { getPercent } from '../../constants/helpers';
import useTheme from '../../hooks/useColorScheme';
import { Candidate } from '../../Models/Candidtate';
import MemberAndVotesList from './MemberAndVotesList';

type Props = {
    candidate: Candidate
};

const OfficerList: FC<Props> = ( props ) => {
    const mode = useTheme()
    return (
        <MemberAndVotesList
            image={
                <Image style={style.image} source={
                    props.candidate.photo === undefined || null ? require( '../../assets/avatar/face-7.jpg' ) :
                        { uri: props.candidate.photo }
                } />
            }
            body={
                <>
                    <Text style={{ fontSize: 16, color: Colors[ mode ].text }}>{props.candidate.voter.name}</Text>
                    <Text style={{ color: 'gray' }}>{props.candidate.position}</Text>
                    <View style={[ { paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', marginVertical: 4, borderWidth: 1, borderColor: '#28A745' } ]}>
                        <Text style={{ color: '#28A745' }}>{props.candidate.partylist}</Text>
                    </View>
                    <Text style={{ color: 'gray' }}>{props.candidate.voter.department}-{props.candidate.voter.year} year | {props.candidate.voter.section} </Text>
                </>
            }
            values={
                <>
                    <Text style={{ color: '#ccc', textAlign: 'right' }}>Total Votes</Text>
                    <Text style={{ color: '#28A745', textAlign: 'right', fontSize: 17 }}>{props.candidate.votes || 0}</Text>
                </>
            }
        />
    );
};

const style = StyleSheet.create( {
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'orange'
    }
} )

export default OfficerList;
