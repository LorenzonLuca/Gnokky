import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, ROUTES } from '../Models/Globals';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import CreateStoriesNavigator from '../Stories/CreateStoriesNavigator';
import HomePage from '../Home/HomePage';
import Prova from './Prova';
import NotificationsPage from '../Notifications/NotificationsPage';
import NewPostPage from '../Post/NewPostPage';

const Stack = createStackNavigator();

export default function FloatingButtonNavigator() {

  const navigation = useNavigation();

  return (
    <Stack.Navigator 
        initialRouteName={ROUTES.STORY} 
        screenOptions={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-outline' />
            </TouchableOpacity>
          ),
        }}>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen 
              name={ROUTES.POST} 
              component={NewPostPage}
              options={{headerShown: false}}
          />
        </Stack.Group>
        <Stack.Screen 
            name={ROUTES.HOME} 
            component={HomePage}
            options={{headerShown: false}}
        />
    </Stack.Navigator>
  );
}
