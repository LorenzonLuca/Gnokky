import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProfilePage from '../Profile/ProfilePage';
import { COLORS, ROUTES, IMAGES } from '../Models/Globals';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../Models/Firebase';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appUser } from '../Models/Globals';
import Settings from './Settings'


const Stack = createStackNavigator();

export default function ProfileNavigator() {

    const navigation = useNavigation()

    const hanldeSignOut = async () => {
        await signOut(auth)
            .then(async () => {
                await AsyncStorage.removeItem("userID");
                appUser.resetAllValues();
                navigation.navigate(ROUTES.LOGIN)
                console.log("LOGGEDOUT")
            })
            .catch((error) => Alert(error));
    }

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
            <Stack.Navigator>
                <Stack.Screen
                    name={ROUTES.PROFILE}
                    component={ProfilePage}
                    initialParams={{ user: appUser }}
                    options={{
                        tabBarHideOnKeyboard: true,
                        headerShown: true,
                        headerTintColor: COLORS.firtText,
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: COLORS.background,
                            borderBottomColor: COLORS.thirdText,
                            borderBottomWidth: 1,
                        },
                        headerLeft: () => (
                            <IconButton
                                icon={() => <Ionicons name={''} size={30} color={'black'} />}
                                onPress={() => { console.log("pressed leading") }}
                            />
                        ),
                        headerTitle: () => (
                            <View style={styles.imageContainer}>
                                <Image source={logo} style={styles.image} />
                            </View>
                        ),
                    }}
                />
                <Stack.Screen
                    name={ROUTES.SETTINGS}
                    component={Settings}
                    options={{
                        tabBarHideOnKeyboard: true,
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
                        // headerRight: () => (
                        //     <IconButton
                        //         icon={() => <Ionicons name={'settings-outline'} size={30} color={'black'} />}
                        //         onPress={hanldeSignOut}
                        //     />
                        // ),
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}