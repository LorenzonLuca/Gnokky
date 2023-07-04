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

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import FloatingButton from '../GN/FloatingButton';
import { IconButton } from "@react-native-material/core";

import HomePage from '../Home/HomePage';
import ProfilePage from '../Profile/ProfilePage';
import { COLORS, ROUTES, appUser, IMAGES } from '../Models/Globals';
import SearchNavigator from '../Search/SearchNavigator';
import { signOut } from 'firebase/auth';

import { useRef } from 'react';
import { auth } from '../Models/Firebase';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import 'react-native-gesture-handler';
import ChatNavigator from '../Chat/ChatNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import HomeNavigator from '../Home/HomeNavigator';
import ProfileNavigator from '../Profile/ProfileNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const navigation = useNavigation();

    const [isTabBarVisible, setIsTabBarVisible] = useState(true);

    const hanldeSignOut = async () => {
        await signOut(auth)
            .then(async () => {
                await AsyncStorage.removeItem("userID");
                appUser.resetAllValues();
                navigation.navigate(ROUTES.LOGIN)
                console.log("LOGGEDOUT")
            })
            .catch((error) => Alert(error));
    }

    const logo = IMAGES.LOGO;

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
                screenOptions={({ route }) => ({
                    tabBarStyle: {
                        display: 'none',
                    },
                    tabBarHideOnKeyboard: true,
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
                            onPress={() => { console.log("pressed leading") }}
                        />
                    ),
                    headerTitle: () => (
                        <View style={styles.imageContainer}>
                            <Image source={logo} style={styles.image} />
                        </View>
                    ),
                    headerRight: () => (
                        <IconButton
                            icon={() => <Ionicons name={'notifications-outline'} size={30} color={'black'} />}
                            onPress={hanldeSignOut}
                        />
                    ),
                    tabBarStyle: {
                        backgroundColor: COLORS.background,
                        borderTopColor: COLORS.thirdText,
                        borderTopWidth: 1,
                    },
                    tabBarLabel: () => { return ""; },
                    tabBarActiveTintColor: COLORS.elements,
                    tabBarIcon: ({ color, size, focused }) => {
                        let iconName;

                        if (route.name === ROUTES.HOME_NAVIGATOR) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === ROUTES.SEARCH) {
                            iconName = focused ? 'search' : 'search-outline';
                        } else if (route.name === ROUTES.POST) {

                        } else if (route.name === ROUTES.CHAT) {
                            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                        } else if (route.name === ROUTES.PROFILE_NAVIGATOR) {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        return <Ionicons name={iconName} size={30} color={color} />
                    }
                })}>
                <Tab.Screen
                    name={ROUTES.HOME_NAVIGATOR}
                    component={HomeNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name={ROUTES.SEARCH}
                    component={SearchNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
                {/* <Tab.Screen
                    name={ROUTES.STORY}
                    component={CreateStoriesNavigator}
                    options={{
                        headerShown: false,
                        tabBarButton: () => (
                            <FloatingButton />
                        ),
                    }}
                /> */}
                <Tab.Screen
                    name={ROUTES.CHAT}
                    component={ChatNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name={ROUTES.PROFILE_NAVIGATOR}
                    component={ProfileNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </BottomSheetModalProvider>
    );
}

