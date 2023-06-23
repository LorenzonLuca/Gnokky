import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, ROUTES } from '../Models/Globals';

import LoginPage from '../Auth/LoginPage';
import RegisterPage from '../Auth/RegisterPage';
import WaitingPage from '../Auth/WaitingPage';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileManagement from '../Profile/ProfileManagement';

const Stack = createStackNavigator();
// Navigator, Screen, Group


export default function AuthNavigator() {
  return (
    <Stack.Navigator 
        initialRouteName={ROUTES.LOGIN} 
        screenOptions={{

        }}>
        <Stack.Screen 
            name={ROUTES.LOGIN} 
            component={LoginPage}
            options={{headerShown: false}}
        />
        <Stack.Screen 
            name={ROUTES.REGISTER} 
            component={RegisterPage}
            options={{headerShown: false}}
        />
        <Stack.Screen 
            name={ROUTES.VERIFY_EMAIL} 
            component={WaitingPage}
            options={{headerShown: false}}
        />
        <Stack.Screen 
            name={ROUTES.PROFILE_MANAGEMENT} 
            component={ProfileManagement}
            options={{headerShown: false}}
        />
        <Stack.Screen 
            name={ROUTES.HOME} 
            component={BottomTabNavigator} 
            options={{headerShown: false}}
        />
    </Stack.Navigator>
  );
}