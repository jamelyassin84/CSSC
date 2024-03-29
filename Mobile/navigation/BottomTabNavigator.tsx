
import { AntDesign, Feather, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { Image } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import CastAVote from '../modules/cast-a-vote/CastAVote'
import ElectionResults from '../modules/election-results/ElectionResults'
import Officers from '../modules/officers/Officers'
import Parties from '../modules/parties/Parties'
import SignOut from '../screens/SignOut'
import { BottomTabParamList } from '../types'

const Tab = createBottomTabNavigator<BottomTabParamList>()
export default function BottomTabNavigator( { route }: any ) {
    const data = route.params
    const colorScheme = useColorScheme()
    return (
        <Tab.Navigator
            initialRouteName="Cast a Vote"
            tabBarOptions={{
                activeTintColor: Colors[ colorScheme ].tint
            }}>
            <Tab.Screen
                name="Cast a Vote"
                component={CastAVoteNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <MaterialCommunityIcons name="vote-outline" size={24} color={color} />,
                }}
                initialParams={{ campus: data.campus, user_id: data.user_id, user: data.user }}
            />
            <Tab.Screen
                name="Election Results"
                component={ElectionResultsNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <AntDesign name="barchart" size={24} color={color} />,
                }}
                initialParams={{ campus: data.campus, user_id: data.user_id, user: data.user }}
            />
            <Tab.Screen
                name="CSSC Officers"
                component={OfficerNavigator}
                options={{
                    tabBarIcon: ( { size } ) => {
                        return (
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require( '../assets/logo/trans-logo.png' )}
                            />
                        );
                    }
                }}
                initialParams={{ campus: data.campus, user_id: data.user_id, user: data.user }}
            />
            <Tab.Screen
                name="Political Parties"
                component={PartiesNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <Feather name="users" size={24} color={color} />,
                }}
                initialParams={{ campus: data.campus, user_id: data.user_id, user: data.user }}
            />
            <Tab.Screen
                name="Sign-Out"
                component={SignOutNavigator}
                options={{
                    tabBarIcon: ( { color } ) => <SimpleLineIcons name="logout" size={24} color={color} />,
                }}
                initialParams={{ campus: data.campus, user_id: data.user_id, user: data.user }}
            />
        </Tab.Navigator>
    )
}

const ElectionResultsStack = createStackNavigator<any>()
function ElectionResultsNavigator( { route }: any ) {
    const data = route.params
    return (
        <ElectionResultsStack.Navigator>
            <ElectionResultsStack.Screen
                name="Election Results"
                component={ElectionResults}
                options={{ headerShown: false }}
                initialParams={{ campus: data.campus, user_id: data.user_id, user: data.user }}
            />
        </ElectionResultsStack.Navigator>
    )
}

const CastAVoteStack = createStackNavigator<any>()
function CastAVoteNavigator( { route }: any ) {
    const data = route.params
    return (
        <CastAVoteStack.Navigator>
            <CastAVoteStack.Screen
                name="Cast a Vote"
                component={CastAVote}
                options={{ headerShown: false }}
                initialParams={{ campus: data.campus, user_id: data.user_id, user: data.user }}
            />
        </CastAVoteStack.Navigator>
    )
}

const PartiesStack = createStackNavigator<any>()
function PartiesNavigator( { route }: any ) {
    const data = route.params
    return (
        <PartiesStack.Navigator>
            <PartiesStack.Screen
                name="Political Parties"
                component={Parties}
                options={{ headerShown: false }}
                initialParams={{ campus: data.campus, user_id: data.user_id, user: data.user }}
            />
        </PartiesStack.Navigator>
    )
}

const OfficerStack = createStackNavigator<any>()
function OfficerNavigator( { route }: any ) {
    const data = route.params
    return (
        <OfficerStack.Navigator>
            <OfficerStack.Screen
                name="CSSC Officers"
                component={Officers}
                options={{ headerShown: false }}
                initialParams={{ campus: data.campus, user_id: data.user_id, user: data.user }}
            />
        </OfficerStack.Navigator>
    )
}

const SignOutStack = createStackNavigator<any>()
function SignOutNavigator( { route }: any ) {
    const data = route.params
    return (
        <SignOutStack.Navigator>
            <SignOutStack.Screen
                name="SignOut"
                component={SignOut}
                options={{ headerShown: false }}
                initialParams={{ campus: data.campus, user_id: data.user_id, user: data.user }}
            />
        </SignOutStack.Navigator>
    )
}



