import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import LoginPage from './components/Auth/LoginPage';
// import RegisterPage from './components/Auth/RegisterPage';
// import WaitingPage from './components/Auth/WaitingPage';
// import HomeTemplate from './components/Home/HomeTemplate';
import ProfileManagement from './components/Profile/ProfileManagement';
// import NewPostPage from './components/Post/NewPostPage';
import GNAppBar from './components/GN/GNAppBar';
import { useFonts } from 'expo-font';
import { Animated, Easing, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigatorTab from './components/GN/NavigatorTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchPage from './components/SwitchPage'
import MainLayout from './components/Home/MainLayout';
import WaitingPage from './components/Auth/WaitingPage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import HomeTemplate from './components/Home/HomeTemplate';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    "mnst-bold": require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
    "mnst-mid": require('./assets/fonts/montserrat/Montserrat-Medium.ttf'),
    "mnst-reg": require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
    "mnst-light": require('./assets/fonts/montserrat/Montserrat-Light.ttf'),
  });


  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('_id');
        if (value !== null) {
          setInitialRoute('NavigatorTab');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const setUserId = async () => {
      const value = await AsyncStorage.getItem('_id');
      global.USER_ID = value;
    };
    setUserId();
    checkAuthStatus();
  }, [])

  const transitionConfig = () => ({
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [scene.index - 1, scene.index, scene.index + 1],
        outputRange: [width, 0, 0],
      });

      return { transform: [{ translateX }] };
    },
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.7],
                extrapolate: 'clamp',
              }),
            },
          }),
        }}
          transitionConfig={transitionConfig}
        >
          <Stack.Screen name="Login" component={LoginPage } initialParams={{title: "SIU"}} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
          <Stack.Screen name="Waiting" component={WaitingPage} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileManagement" component={ProfileManagement} options={{ headerShown: false }} />
          <Stack.Screen name="NavigatorTab" component={NavigatorTab} options={{ headerShown: false }} />
          <Stack.Screen name="HomeTemplate" component={HomeTemplate} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}