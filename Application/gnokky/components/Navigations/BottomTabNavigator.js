import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton } from "@react-native-material/core";

import { COLORS, ROUTES, appUser, IMAGES } from '../Models/Globals';
import SearchNavigator from '../Search/SearchNavigator';
import { signOut } from 'firebase/auth';

import { auth } from '../Models/Firebase';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import 'react-native-gesture-handler';
import ChatNavigator from './ChatNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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

