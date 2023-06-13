import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet } from 'react-native';
import HomePage from "../Home/HomePage";
import NotificationsPage from "../Notifications/NotificationsPage";
import SearchNavigator from "../Search/SearchNavigator";
import ProfilePage from "../Profile/ProfilePage";
import Ionicons from '@expo/vector-icons/Ionicons';
import NewPostPage from '../Post/NewPostPage';
import FloatingButton from './FloatingButton';
import { appUser, COLORS } from '../Models/Globals';

const Tab = createBottomTabNavigator();

export default function NavigatorTab() {



    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabel: () => { return ""; },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: COLORS.background,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    height: 60,
                    zIndex: 3, 
                    elevation: 3,
                    // bottom: 10,
                    // left: 20,
                    // right: 20,
                },
            }}
        >
            <Tab.Screen name="Home" component={HomePage} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons name={focused ? 'home' : 'home-outline'} size={30} />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="Search" component={SearchNavigator} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons name={focused ? 'search' : 'search-outline'} size={30} />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="Post" component={NewPostPage} options={{
                tabBarButton: () => (
                    <FloatingButton />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="Notifications" component={NotificationsPage} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={30} />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="Profile" component={ProfilePage} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons name={focused ? 'person' : 'person-outline'} size={30} />
                ),
                headerShown: false,
            }}
                initialParams={{ user: appUser }} />
        </Tab.Navigator>
    );
};



