
import React, { FC } from 'react'
import { Text, View } from 'react-native'

type Props = {}
const BottomSheetTopStyle: FC<Props> = ( props ) => {
    return (
        <View style={
            {
                width: 100,
                height: 10,
                backgroundColor: '#ccc',
                borderRadius: 10,
                alignSelf: 'center',
                transform: [
                    { translateY: -10 }
                ]
            }
        } />

    )
}

export default BottomSheetTopStyle
