
import React, { FC } from 'react';
import { RefreshControl } from 'react-native';
import { Dimensions, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
    onRefresh: Function,
    loading: boolean,
    backgroundColor?: string
};

const WithRefreshComponent: FC<Props> = ( props ) => {
    return (
        <ScrollView
            style={{
                height: Dimensions.get( 'screen' ).height,
                width: Dimensions.get( 'screen' ).width,
                backgroundColor: props.backgroundColor
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    tintColor='#07B1E8'
                    refreshing={props.loading}
                    onRefresh={props.onRefresh()}
                />
            }>
            {props.children}
            <View style={{ height: 150 }}></View>
        </ScrollView>
    );
};

export default WithRefreshComponent;
