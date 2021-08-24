import React, { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import CommonHeader from '../../components/headers/CommonHeader'
import WithRefreshComponent from '../../components/utils/WithRefreshComponent'
import Container from '../../constants/Layout'
import { collection } from '../../firebase/firebase'
import { Collections } from '../../Models/Admin'
import { Platform } from '../../Models/Platform'
import * as Linking from 'expo-linking'


type Props = {}
const ViewPlatform: FC<Props> = ( { route }: any ) => {

    const data = route.params

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
        setLoading( true )
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
                <Text style={[ alertStyle, noData === true ? { position: 'absolute', left: 500 } : {} ]}>
                    Candidate hasn't added its platform yet..
                </Text>
                <View style={[ { justifyContent: 'center', alignItems: 'center' }, noData !== true ? { position: 'absolute', left: 500 } : {} ]}>
                    <Text style={data.style.subtitle}>Title</Text>
                    <Text style={data.style.title}>{platform.title}</Text>

                    <Text style={data.style.subtitle}>Description</Text>
                    <Text style={data.style.title}>{platform.description}</Text>

                    <Text style={data.style.subtitle}>Link to Platform Video</Text>
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


export default ViewPlatform
