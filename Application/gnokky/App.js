import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import AuthNavigator from './components/Navigations/AuthNavigator';
import BottomTabNavigator from './components/Navigations/BottomTabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import i18next from './services/i18next';
import FirebaseUtils from './components/Models/FirebaseUtils';
import { appUser } from './components/Models/Globals';
import { ActivityIndicator, DeviceEventEmitter } from 'react-native';

export default function App() {
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        const handleLogout = () => {
            setLogout(true);
            console.log('porcoddio');
        };

        const handleResetLogout = () => {
            setLogout(false);
        };

        const logoutListener = DeviceEventEmitter.addListener('logout', handleLogout);
        const resetLogoutListener = DeviceEventEmitter.addListener(
            'reset.logout',
            handleResetLogout
        );

        // Clean up the event listeners when the component unmounts
        return () => {
            logoutListener.remove();
            resetLogoutListener.remove();
        };
    }, []);

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
                    appUser.setId(value);
                    await FirebaseUtils.updateAppUser();
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
                {(userId && !logout) ? (
                    <BottomTabNavigator />
                ) : (
                    <AuthNavigator logout={logout} />
                )}
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}