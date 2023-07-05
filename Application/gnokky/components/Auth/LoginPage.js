import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import GNButton from '../GN/GNButton';
import GNTextInput from '../GN/GNTextInput';
import GNTextInputPassword from '../GN/GNTextInputPassword';
import { handleLogin } from './AuthUtils';
import { StyleSheet } from 'react-native';
import { COLORS, ROUTES, appUser, IMAGES } from '../Models/Globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseUtils from '../Models/FirebaseUtils';



export default function LoginPage({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const logo = IMAGES.LOGO;

    useEffect(() => {
        const getUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('userID');
                if (value !== null) {
                    console.log("ORCABOIA");
                    appUser.setId(value);
                    // await appUser.getValueAndUpdate();
                    await FirebaseUtils.updateAppUser();
                    navigation.navigate(ROUTES.BOTTOM_NAVIGATOR)
                }
            } catch (e) {
                console.log("Error while trying to get value from async storage: ", e);
            }
        };

        getUserData();
    }, [])

    const styles = StyleSheet.create({
        safeAreaContainer: {
            flex: 1,
        },
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
            alignItems: 'center',
            justifyContent: 'center',
        },
        errorText: {
            color: '#F00',
            textAlign: 'center',
            marginVertical: 35,
        },
        text: {
            textAlign: 'center',
            color: COLORS.secondText,

        },
        forgotPasswordLink: {
            color: COLORS.elements,
            fontWeight: 'bold',
            textAlign: 'right',
            marginBottom: 40,
        },
        link: {
            color: COLORS.elements,
            fontWeight: 'bold',
        },
        title: {
            color: COLORS.elements,
            fontSize: 65,
            marginBottom: 120,
            textAlign: 'center',
            fontFamily: 'mnst-bold'
        },
        keyboard: {
            top: 125,
            flex: 1,
        },
        image: {
            // flex: 1,
            width: 80,
            height: 80,
            alignSelf: 'center',
            // resizeMode: 'cover',
        }
    });

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.keyboard}>
                    <Image source={logo} style={styles.image} />
                    <Text style={styles.title}>SIGN IN</Text>
                    <GNTextInput
                        placeholder='Email'
                        iconName="mail-outline"
                        iconNameFocused="mail"
                        onChangeText={setEmail}
                        animation="true" />
                    <GNTextInputPassword
                        placeholder='Password'
                        iconName="lock-closed-outline"
                        iconNameFocused="lock-closed"
                        onChangeText={setPassword}
                        animation="true"
                        marginBottom={15} />
                    <Text
                        style={styles.forgotPasswordLink}
                        onPress={() => { }}>
                        Forgot password?
                    </Text>
                    <GNButton
                        title={"SIGN IN"}
                        onPress={() => { handleLogin(email, password, navigation, setError) }}
                    />
                    <Text style={styles.errorText}>{error}</Text>
                    <Text style={styles.text}>
                        Don't have already an account?
                        <Text style={styles.link} onPress={() => { navigation.navigate(ROUTES.REGISTER) }}> Sign up now!</Text>
                    </Text>
                    <StatusBar style="dark" />
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
};