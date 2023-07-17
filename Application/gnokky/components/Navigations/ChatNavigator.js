import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { COLORS, IMAGES } from '../Models/Globals';
import { View, StyleSheet, Image } from 'react-native';
import ChatPage from '../Chat/ChatPage';
import ChatTemplate from '../Chat/ChatTemplate';
import ProfilePage from '../Profile/ProfilePage';

const Stack = createStackNavigator();

export default function ChatNavigator() {
    const logo = IMAGES.LOGO;

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
                    name="Chat"
                    component={ChatPage}
                    options={{
                        headerLeft: null, // Rimuove il pulsante di navigazione "Indietro"
                    }}
                />
                <Stack.Screen
                    name="TemplateChat"
                    component={ChatTemplate}
                />
                <Stack.Screen
                    name={"ProfileSearch"}
                    component={ProfilePage}
                // options={{
                //     tabBarHideOnKeyboard: true,
                //     headerShown: true,
                //     headerTintColor: COLORS.firtText,
                //     headerTitleAlign: 'center',
                //     headerStyle: {
                //         backgroundColor: COLORS.background,
                //         borderBottomColor: COLORS.thirdText,
                //         borderBottomWidth: 1,
                //     },
                //     headerTitle: () => (
                //         <View style={styles.imageContainer}>
                //             <Image source={logo} style={styles.image} />
                //         </View>
                //     ),
                //     headerRight: () => (
                //         <IconButton
                //             icon={() => <Ionicons name={'notifications-outline'} size={30} color={'black'} />}
                //             onPress={hanldeSignOut}
                //         />
                //     ),
                // }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}