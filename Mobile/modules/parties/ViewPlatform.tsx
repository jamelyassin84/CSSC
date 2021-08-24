import React, { FC } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonHeader from '../../components/headers/CommonHeader'
import WithRefreshComponent from '../../components/utils/WithRefreshComponent'
import Container from '../../constants/Layout'
import { collection } from '../../firebase/firebase'
import { Collections } from '../../Models/Admin'
import { Platform } from '../../Models/Platform'
import * as Linking from 'expo-linking'
import { Candidate } from '../../Models/Candidtate'
import { Dimensions } from 'react-native'
import useTheme from '../../hooks/useColorScheme'
import Colors from '../../constants/Colors'


type Props = {}
const ViewPlatform: FC<Props> = ( { route }: any ) => {

    const data = route.params
    const mode = useTheme()

    const [ isLoading, setLoading ] = React.useState( false )
    const [ platform, setplatform ]: any = React.useState<Platform | any>( {} )
    const [ noData, setnoData ]: any = React.useState<boolean>( true )


    React.useEffect( () => {
        collection( Collections.Platform ).onSnapshot( () => {
            onRefresh()
        } )
    }, [] )

    const onRefresh = () => {
        getPlatform()
    }

    const getPlatform = () => {
        collection( Collections.Platform )
            .where( 'candidate_id', '==', data.voter_id )
            .get().then( ( snapshot: any ) => {
                setnoData( false )
                snapshot.forEach( ( doc: any ) => {
                    setplatform( Object.assign( doc.data(), { id: doc.id } ) )
                    setnoData( true )
                } )
                setLoading( false )
            } )
    }

    const alertStyle = { color: '#25AFF3', backgroundColor: 'rgba(37, 175, 243,.2)', width: '100%', padding: 20 }

    return (
        <Container>
            <CommonHeader title={`${ data.name }'s Platform`} />
            <WithRefreshComponent onRefresh={() => onRefresh} loading={isLoading}>
                <Image style={style.cover}
                    blurRadius={50}
                    source={
                        data.candidate.photo !== null || data.candidate.photo !== null ? { uri: data.candidate.photo } :
                            require( '../../assets/avatar/face-7.png' )
                    } />
                <View style={style.topContainer}>
                    <Image style={style.avatar} source={
                        data.candidate.photo !== null || data.candidate.photo !== null ? { uri: data.candidate.photo } :
                            require( '../../assets/avatar/face-7.png' )
                    } />
                    <View>
                        <Text style={style.hi}>Hi! I am </Text>
                        <Text style={style.name}>{data.name} </Text>
                    </View>
                </View>

                <Text style={[ alertStyle, noData === true ? { position: 'absolute', left: 500 } : {} ]}>
                    Candidate hasn't added its platform yet..
                </Text>
                <View style={[ { padding: 16 }, noData !== true ? { position: 'absolute', left: 500 } : {} ]}>
                    <Text style={[ style.subtitle, { color: Colors[ mode ].text } ]}>My Platform</Text>
                    <Text style={[ style.title, { fontSize: 22, color: 'red', fontWeight: 'bold' } ]}>{platform.title}</Text>

                    <Text style={[ style.subtitle, { color: Colors[ mode ].text } ]}>Reforms</Text>
                    <Text style={style.title}>{platform.description}</Text>

                    <Text style={[ style.subtitle, { color: Colors[ mode ].text } ]}>Link to My Platform Video</Text>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL( platform.video_link )
                    }}>
                        <Text style={[ data.style.subtitle, { fontWeight: 'normal', color: '#25AFF3' } ]}>{platform.video_link}</Text>
                    </TouchableOpacity>
                </View>
            </WithRefreshComponent>
        </Container>
    )
}


const style = StyleSheet.create( {
    cover: {
        height: 200,
        width: Dimensions.get( 'screen' ).width,
        position: 'absolute',
        zIndex: -1,
        resizeMode: 'stretch',
    },
    avatar: {
        height: 200,
        width: 150
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(150,150,150,.1)',
    },
    hi: {
        color: 'rgba(250,150,150,.9)',
        fontWeight: '200',
        fontSize: 30,
        marginLeft: 15
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 15,
        color: 'white'
    },
    title: {
        color: 'gray',
        lineHeight: 32
    },
    subtitle: {
        marginTop: 26,
        fontSize: 16,
        fontWeight: 'bold',
    }
} )

export default ViewPlatform
