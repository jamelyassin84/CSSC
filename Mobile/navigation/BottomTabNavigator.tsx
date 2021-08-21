
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CastAVote from '../modules/cast-a-vote/CastAVote';
import ElectionResults from '../modules/election-results/ElectionResults';
import Parties from '../modules/parties/Parties';
import { BottomTabParamList } from '../types';

const Tab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator( { route }: any ) {
    const data = route.params
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator
            initialRouteName="Cast a Vote"
            tabBarOptions={{
                activeTintColor: Colors[ colorScheme ].tint
            }}>
            <Tab.Screen
                name="Election Results"
                component={ElectionResultsNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <AntDesign name="barchart" size={24} color={color} />,
                }}
                initialParams={{ campus: data.campus }}
            />
            <Tab.Screen
                name="Cast a Vote"
                component={CastAVoteNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <MaterialCommunityIcons name="vote-outline" size={34} color={color} />,
                }}
                initialParams={{ campus: data.campus }}
            />
            <Tab.Screen
                name="Political Parties"
                component={PartiesNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <Feather name="users" size={24} color={color} />,
                }}
                initialParams={{ campus: data.campus }}
            />
        </Tab.Navigator>
    );
}

const ElectionResultsStack = createStackNavigator<any>();
function ElectionResultsNavigator( { route }: any ) {
    const data = route.params
    return (
        <ElectionResultsStack.Navigator>
            <ElectionResultsStack.Screen
                name="Election Results"
                component={ElectionResults}
                options={{ headerShown: false }}
                initialParams={{ campus: data.campus }}
            />
        </ElectionResultsStack.Navigator>
    );
}

const CastAVoteStack = createStackNavigator<any>();
function CastAVoteNavigator( { route }: any ) {
    const data = route.params
    return (
        <CastAVoteStack.Navigator>
            <CastAVoteStack.Screen
                name="Cast a Vote"
                component={CastAVote}
                options={{ headerShown: false }}
                initialParams={{ campus: data.campus }}
            />
        </CastAVoteStack.Navigator>
    );
}

const PartiesStack = createStackNavigator<any>();
function PartiesNavigator( { route }: any ) {
    const data = route.params
    return (
        <PartiesStack.Navigator>
            <PartiesStack.Screen
                name="Political Parties"
                component={Parties}
                options={{ headerShown: false }}
                initialParams={{ campus: data.campus }}
            />
        </PartiesStack.Navigator>
    );
}
