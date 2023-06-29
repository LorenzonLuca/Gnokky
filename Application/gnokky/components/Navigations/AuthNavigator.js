import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, ROUTES } from '../Models/Globals';



import LoginPage from '../Auth/LoginPage';
import RegisterPage from '../Auth/RegisterPage';
import WaitingPage from '../Auth/WaitingPage';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileManagement from '../Profile/ProfileManagement';
import AdminPage from '../Admin/AdminPage';

const Stack = createStackNavigator();
// Navigator, Screen, Group


export default function AuthNavigator() {

    return (
        <Stack.Navigator
            initialRouteName={ROUTES.LOGIN}
            screenOptions={{

            }}>
            <Stack.Screen
                name={ROUTES.ADMIN}
                component={AdminPage}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name={ROUTES.LOGIN}
                component={LoginPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.REGISTER}
                component={RegisterPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.VERIFY_EMAIL}
                component={WaitingPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.PROFILE_MANAGEMENT}
                component={ProfileManagement}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.BOTTOM_NAVIGATOR}
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}