import React, { useEffect, useState, useRef, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileManagement from './components/Profile/ProfileManagement';
import { useFonts } from 'expo-font';
import { Animated, Easing, View, DeviceEventEmitter } from 'react-native';
import NavigatorTab from './components/GN/NavigatorTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WaitingPage from './components/Auth/WaitingPage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GNCamera from './components/GN/GNCamera';
import 'react-native-gesture-handler';
import AuthNavigator from './components/Navigations/AuthNavigator';


import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { db } from "./components/Models/Firebase"
import { storage } from "./components/Models/Firebase"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth } from './components/Models/Firebase';
import BottomTabNavigator from './components/Navigations/BottomTabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import i18next, { languageResources } from './services/i18next';
import { useTranslation } from 'react-i18next';
import languageList from './services/languagesList.json';
import FirebaseUtils from './components/Models/FirebaseUtils';
import { appUser } from './components/Models/Globals';

const Stack = createStackNavigator();

export default function App() {
    // const [refresh, setRefresh] = useState(false);

    // DeviceEventEmitter.addListener('changed.theme', (event) => {
    //     setRefresh(!refresh)
    //     console.log("reloading app");
    // });

    const [loaded] = useFonts({
        "mnst-bold": require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
        "mnst-mid": require('./assets/fonts/montserrat/Montserrat-Medium.ttf'),
        "mnst-reg": require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
        "mnst-light": require('./assets/fonts/montserrat/Montserrat-Light.ttf'),
    });

    useEffect(() => {
        const setAppLanguage = async () => {
            try {
                const lng = await AsyncStorage.getItem('lng');
                if (!lng) {
                    await AsyncStorage.setItem('lng', 'en');
                } else {
                    i18next.changeLanguage(lng);
                    await AsyncStorage.setItem('lng', lng);
                }
            } catch (e) {
                console.log('Errore durante il recupero del valore di "lng" dall\'Async Storage:', e);
            }
        };

        setAppLanguage();
    }, []);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userID');
                if (value !== null) {
                    console.log("ORCABOIA");
                    appUser.setId(value);
                    // await appUser.getValueAndUpdate();
                    await FirebaseUtils.updateAppUser();
                    // navigation.navigate(ROUTES.BOTTOM_NAVIGATOR)
                    setUserId(value);
                }
            } catch (e) {
                console.log("Error while trying to get value from async storage: ", e);
            }
        };

        getUserData();
    }, [])


    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar backgroundColor='white' barStyle='light-content' />
            <NavigationContainer>
                {userId ? (
                    <BottomTabNavigator />
                ) : (
                    <AuthNavigator />
                )}
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}