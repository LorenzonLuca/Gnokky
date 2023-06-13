import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './HomePage';
import NavigatorTab from './../../components/NavigatorTab'
import ChatPage from '../Chat/ChatPage';
import ProfileManagement from '../Profile/ProfileManagement';
import GNAppBar from '../../components/GNAppBar';

const Stack = createStackNavigator();

export default function HomeTemplate() {
    return (
        <NavigationContainer independent={true}>
            <GNAppBar title={"Gnokkkky"}/>
            <Stack.Navigator>
                <Stack.Screen name="NaviagatorTab" component={NavigatorTab} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={ChatPage} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileManagement" component={ProfileManagement} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}