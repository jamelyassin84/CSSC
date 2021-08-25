import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'

type Props = {}
const SignOut: FC<Props> = ( props ) => {
    const navigation = useNavigation()
    React.useEffect( () => {
        navigation.navigate( 'SignIn' )
    }, [] )
    return <></>
}

export default SignOut
