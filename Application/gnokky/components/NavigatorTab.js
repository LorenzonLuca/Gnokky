import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import HomePage from "../pages/Home/HomePage";
import NotificationsPage from "../pages/Notifications/NotificationsPage";
import SearchPage from "../pages/Search/SearchPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import Ionicons from '@expo/vector-icons/Ionicons';
import NewPostPage from '../pages/Post/NewPostPage';
import FloatingButton from './FloatingButton';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -35,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}

        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#5978a6',
        }}>
            {children}
        </View>
    </TouchableOpacity>
);


export default function NavigatorTab() {

    const handlePostButtonPress = () => {

    };

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabel: () => { return ""; },
                tabBarStyle: {
                    position: 'absolute',
                    // bottom: 10,
                    // left: 20,
                    // right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    height: 60,
                    ...styles.shadow
                },
            }}
        >
            <Tab.Screen name="Home" component={HomePage} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons name={focused ? 'home' : 'home-outline'} size={30} />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="Search" component={SearchPage} options={{
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
                initialParams={{ property: true }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});



