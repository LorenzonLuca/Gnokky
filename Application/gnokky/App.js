import React, { useEffect, useState, useRef, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileManagement from './components/Profile/ProfileManagement';
import { useFonts } from 'expo-font';
import { Animated, Easing, View } from 'react-native';
import NavigatorTab from './components/GN/NavigatorTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WaitingPage from './components/Auth/WaitingPage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GNCamera from './components/GN/GNCamera';
import CreateStoriesNavigator from './components/Stories/CreateStoriesNavigator';
import 'react-native-gesture-handler';
import AuthNavigator from './components/Navigations/AuthNavigator';


import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { db } from "./components/Models/Firebase"
import { storage } from "./components/Models/Firebase"
import { appUser } from "./components/Models/Globals"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth } from './components/Models/Firebase';
import BottomTabNavigator from './components/Navigations/BottomTabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Stack = createStackNavigator();

export default function App() {

    const [loaded] = useFonts({
        "mnst-bold": require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
        "mnst-mid": require('./assets/fonts/montserrat/Montserrat-Medium.ttf'),
        "mnst-reg": require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
        "mnst-light": require('./assets/fonts/montserrat/Montserrat-Light.ttf'),
    });


    // useEffect(() => {
    //     const checkAuthStatus = async () => {
    //         try {
    //             const value = await AsyncStorage.getItem('_id');
    //             if (value !== null) {
    //                 setInitialRoute('NavigatorTab');
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     const setUserId = async () => {
    //         const value = await AsyncStorage.getItem('_id');
    //         global.USER_ID = value;
    //     };
    //     setUserId();
    //     checkAuthStatus();
    // }, [])

    // const transitionConfig = () => ({
    //     transitionSpec: {
    //         duration: 500,
    //         easing: Easing.out(Easing.poly(4)),
    //         timing: Animated.timing,
    //         useNativeDriver: true,
    //     },
    //     screenInterpolator: sceneProps => {
    //         const { layout, position, scene } = sceneProps;
    //         const width = layout.initWidth;

    //         const translateX = position.interpolate({
    //             inputRange: [scene.index - 1, scene.index, scene.index + 1],
    //             outputRange: [width, 0, 0],
    //         });

    //         return { transform: [{ translateX }] };
    //     },
    // });

    // return (
    //     <SafeAreaProvider>
    //         <NavigationContainer>
    //             <Stack.Navigator screenOptions={{
    //                 headerShown: false,
    //                 cardStyle: { backgroundColor: 'transparent' },
    //                 cardOverlayEnabled: true,
    //                 cardStyleInterpolator: ({ current: { progress } }) => ({
    //                     cardStyle: {
    //                         opacity: progress.interpolate({
    //                             inputRange: [0, 1],
    //                             outputRange: [0, 1],
    //                         }),
    //                     },
    //                     overlayStyle: {
    //                         opacity: progress.interpolate({
    //                             inputRange: [0, 1],
    //                             outputRange: [0, 0.7],
    //                             extrapolate: 'clamp',
    //                         }),
    //                     },
    //                 }),
    //             }}
    //                 transitionConfig={transitionConfig}
    //             >
    //                 <Stack.Screen name="Login" component={LoginPage} initialParams={{ title: "SIU" }} options={{ headerShown: false }} />
    //                 <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
    //                 <Stack.Screen name="Waiting" component={WaitingPage} options={{ headerShown: false }} />
    //                 <Stack.Screen name="ProfileManagement" component={ProfileManagement} options={{ headerShown: false }} />
    //                 <Stack.Screen name="NavigatorTab" component={NavigatorTab} options={{ headerShown: false }} />
    //                 <Stack.Screen name="CreateStory" component={CreateStoriesNavigator} options={{ headerShown: false }} />
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     </SafeAreaProvider>
    // );

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing)
            setInitializing(false);
    }


    useEffect(() => {
        const getUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userID');
                if (value !== null) {
                    appUser.setId(value);
                    await appUser.getValueAndUpdate();
                    setInitializing(false);
                }
            } catch (e) {
                console.log("Error while trying to get value from async storage: ", e);
            }
        };

        getUserData();
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) {
        return null;
    }

    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                {/* {(!user) ? (
                <AuthNavigator />
            ) : (
                <BottomTabNavigator />
            )} */}
                <AuthNavigator />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}