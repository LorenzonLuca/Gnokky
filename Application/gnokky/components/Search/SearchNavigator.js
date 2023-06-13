import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SearchPage from './SearchPage';
import ProfilePage from '../Profile/ProfilePage';

const Stack = createStackNavigator();

export default function SearchNavigator() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Search" component={SearchPage} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileSearch" component={ProfilePage} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}