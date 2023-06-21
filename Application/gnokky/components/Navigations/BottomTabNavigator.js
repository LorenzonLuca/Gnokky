// import React from 'react';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import { StyleSheet } from 'react-native';
// import HomePage from "../Home/HomePage";
// import NotificationsPage from "../Notifications/NotificationsPage";
// import SearchNavigator from "../Search/SearchNavigator";
// import ProfilePage from "../Profile/ProfilePage";
// import Ionicons from '@expo/vector-icons/Ionicons';
// import NewPostPage from '../Post/NewPostPage';
// import FloatingButton from './FloatingButton';
// import { appUser, COLORS } from '../Models/Globals';

// const Tab = createBottomTabNavigator();

// export default function BottomTabNavigator() {



//     return (
//         <Tab.Navigator
//             screenOptions={{
//                 tabBarLabel: () => { return ""; },
//                 tabBarStyle: {
//                     position: 'absolute',
//                     backgroundColor: COLORS.background,
//                     borderTopLeftRadius: 15,
//                     borderTopRightRadius: 15,
//                     height: 60,
//                     zIndex: 3,
//                     elevation: 3,
//                     // bottom: 10,
//                     // left: 20,
//                     // right: 20,
//                 },
//             }}
//         >
//             <Tab.Screen name="Home" component={HomePage} options={{
//                 tabBarIcon: ({ focused }) => (
//                     <Ionicons name={focused ? 'home' : 'home-outline'} size={30} />
//                 ),
//                 headerShown: false,
//             }} />
//             <Tab.Screen name="Search" component={SearchNavigator} options={{
//                 tabBarIcon: ({ focused }) => (
//                     <Ionicons name={focused ? 'search' : 'search-outline'} size={30} />
//                 ),
//                 headerShown: false,
//             }} />
//             <Tab.Screen name="Post" component={NewPostPage} options={{
//                 tabBarButton: () => (
//                     <FloatingButton />
//                 ),
//                 headerShown: false,
//             }} />
//             <Tab.Screen name="Notifications" component={NotificationsPage} options={{
//                 tabBarIcon: ({ focused }) => (
//                     <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={30} />
//                 ),
//                 headerShown: false,
//             }} />
//             <Tab.Screen name="Profile" component={ProfilePage} options={{
//                 tabBarIcon: ({ focused }) => (
//                     <Ionicons name={focused ? 'person' : 'person-outline'} size={30} />
//                 ),
//                 headerShown: false,
//             }}
//                 initialParams={{ user: appUser }} />
//         </Tab.Navigator>
//     );
// };

import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import FloatingButton from '../GN/FloatingButton';
import { AppBar, HStack, IconButton } from "@react-native-material/core";

import HomePage from '../Home/HomePage';
import SearchPage from '../Search/SearchPage';
import NewPostPage from '../Post/NewPostPage';
import NotificationsPage from '../Notifications/NotificationsPage';
import ProfilePage from '../Profile/ProfilePage';
import { COLORS, ROUTES, appUser } from '../Models/Globals';
import NewStoryPage from '../Stories/NewStoryPage';
import CreateStoriesNavigator from '../Stories/CreateStoriesNavigator';
import SearchNavigator from '../Search/SearchNavigator';


import { useRef } from 'react';

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import 'react-native-gesture-handler';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {

    const logo = require('./../../assets/logo/logo_gnocchi_viola.png');

    const styles = StyleSheet.create({
        imageContainer: {
            width: 50,
            height: 50,
            overflow: 'hidden',
            marginHorizontal: 10
        },
        image: {
            flex: 1,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        }
    });

    return (
        <BottomSheetModalProvider>
            <Tab.Navigator 
                screenOptions={({route}) => ({
                    headerTintColor: COLORS.firtText,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: COLORS.background,
                        borderBottomColor: COLORS.thirdText,
                        borderBottomWidth: 1,
                    },
                    headerLeft: () => (
                        <IconButton
                            icon={() => <Ionicons name={''} size={30} color={'black'} />}
                            onPress={() => {console.log("pressed leading")}}
                        />
                    ),
                    headerTitle: () => (
                        <View style={styles.imageContainer}>
                            <Image source={logo} style={styles.image} />
                        </View>
                    ),
                    headerRight: () => (
                        <IconButton
                            icon={() => <Ionicons name={'chatbubbles-outline'} size={30} color={'black'} />}
                            onPress={() => {console.log("pressed trailing")}}
                        />
                    ),
                    tabBarStyle: {
                        backgroundColor: COLORS.background,
                        borderTopColor: COLORS.thirdText,
                        borderTopWidth: 1,
                    },
                    tabBarLabel: () => { return ""; },
                    tabBarActiveTintColor: COLORS.elements,
                    tabBarIcon: ({color, size, focused}) => {
                        let iconName;

                        if(route.name === ROUTES.HOME){
                            iconName = focused ? 'home' : 'home-outline';
                        }else if(route.name === ROUTES.SEARCH){
                            iconName = focused ? 'search' : 'search-outline';
                        }else if(route.name === ROUTES.POST){
                            
                        }else if(route.name === ROUTES.NOTIFICATION){
                            iconName = focused ? 'notifications' : 'notifications-outline';
                        }else if(route.name === ROUTES.PROFILE){
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        return <Ionicons name={iconName} size={30} color={color} />
                    } 
                })}>    
                <Tab.Screen 
                    name={ROUTES.HOME} 
                    component={HomePage} 
                    options={{headerShown: true}}
                />
                <Tab.Screen 
                    name={ROUTES.SEARCH} 
                    component={SearchNavigator} 
                    options={{headerShown: false}}
                />
                <Tab.Screen 
                    name={ROUTES.STORY} 
                    component={CreateStoriesNavigator} 
                    options={{
                        headerShown: false,
                        tabBarButton: () => (
                            <FloatingButton />
                        ),
                    }}
                />
                <Tab.Screen 
                    name={ROUTES.NOTIFICATION} 
                    component={NotificationsPage} 
                />
                <Tab.Screen 
                    name={ROUTES.PROFILE} 
                    component={ProfilePage} 
                    initialParams={{ user: appUser }}
                />
            </Tab.Navigator>
        </BottomSheetModalProvider>
    );
}

