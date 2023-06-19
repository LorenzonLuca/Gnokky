import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, ROUTES } from '../Models/Globals';

import CreateStoriesNavigator from '../Stories/CreateStoriesNavigator';
import HomePage from '../Home/HomePage';

const Stack = createStackNavigator();

export default function FloatingButtonNavigator() {
  return (
    <Stack.Navigator 
        initialRouteName={ROUTES.STORY} 
        screenOptions={{}}>
        <Stack.Screen 
            name={ROUTES.STORY} 
            component={CreateStoriesNavigator}
            options={{headerShown: true}}
        />
        <Stack.Screen 
            name={ROUTES.HOME} 
            component={HomePage}
            options={{headerShown: false}}
        />
    </Stack.Navigator>
  );
}
