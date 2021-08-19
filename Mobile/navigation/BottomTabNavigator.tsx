
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CastAVote from '../modules/cast-a-vote/CastAVote';
import ElectionResults from '../modules/election-results/ElectionResults';
import { BottomTabParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Election Results"
            tabBarOptions={{
                activeTintColor: Colors[ colorScheme ].tint,

            }}>
            <BottomTab.Screen
                name="Election Results"
                component={ElectionResultsNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <AntDesign name="barchart" size={24} color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Cast a Vote"
                component={CastAVoteNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <MaterialCommunityIcons name="vote-outline" size={34} color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Parties"
                component={PartiesNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <Feather name="users" size={24} color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

const ElectionResultsStack = createStackNavigator<any>();
function ElectionResultsNavigator() {
    return (
        <ElectionResultsStack.Navigator>
            <ElectionResultsStack.Screen
                name="Election Results"
                component={ElectionResults}
                options={{ headerShown: false }}
            />
        </ElectionResultsStack.Navigator>
    );
}

const CastAVoteStack = createStackNavigator<any>();
function CastAVoteNavigator() {
    return (
        <CastAVoteStack.Navigator>
            <CastAVoteStack.Screen
                name="Cast a Vote"
                component={CastAVote}
                options={{ headerShown: false }}
            />
        </CastAVoteStack.Navigator>
    );
}

const PartiesStack = createStackNavigator<any>();
function PartiesNavigator() {
    return (
        <PartiesStack.Navigator>
            <PartiesStack.Screen
                name="Parties"
                component={CastAVote}
                options={{ headerShown: false }}
            />
        </PartiesStack.Navigator>
    );
}
