
import React, { FC } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable'
import Colors from '../../constants/Colors';
import useTheme from '../../hooks/useColorScheme';

type Props = {
    show: Boolean
};

const Loader: FC<Props> = ( props ) => {
    const mode = useTheme()
    return (
        <View style={[ { alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: Colors[ mode ].background }, props.show !== true ? { position: 'absolute', left: -500 } : {} ]}>
            <Animatable.Image
                animation="zoomIn"
                style={{
                    zIndex: 9,
                    alignSelf: 'center',
                    height: 200,
                    width: 200,
                    marginTop: -200
                }}
                source={require( '../../assets/logo/trans-logo.png' )}
            />
        </View>
    );
};

export default Loader;
