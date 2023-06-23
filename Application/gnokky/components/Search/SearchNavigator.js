import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SearchPage from './SearchPage';
import ProfilePage from '../Profile/ProfilePage';
import { COLORS } from '../Models/Globals';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function SearchNavigator() {

    const logo = require('./../../assets/logo/logo_gnocchi_viola.png');

    const styles = StyleSheet.create({
        imageContainer: {
            width: 50,
            height: 50,
            overflow: 'hidden',
            marginHorizontal: 10
        },
        image: {
            flex: 1,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        }
    });

    return (
        <NavigationContainer independent={true} >
            <Stack.Navigator
                screenOptions={() => ({
                    headerShown: true,
                    headerTintColor: COLORS.firtText,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: COLORS.background,
                        borderBottomColor: COLORS.thirdText,
                        borderBottomWidth: 1,
                    },
                    headerTitle: () => (
                        <View style={styles.imageContainer}>
                            <Image source={logo} style={styles.image} />
                        </View>
                    ),
                })}
            >
                <Stack.Screen 
                    name="Search" 
                    component={SearchPage}
                    options={{
                        headerLeft: null, // Rimuove il pulsante di navigazione "Indietro"
                    }} 
                />
                <Stack.Screen name="ProfileSearch" component={ProfilePage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}