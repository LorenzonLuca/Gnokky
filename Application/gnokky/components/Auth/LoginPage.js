import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView} from 'react-native';
import { useState } from 'react';
import GNButton from '../GN/GNButton';
import GNTextInput from '../GN/GNTextInput';
import GNTextInputPassword from '../GN/GNTextInputPassword';
import { handleLogin } from './AuthUtils';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ROUTES } from '../Models/Globals';
import { COLORS } from '../Models/Globals';

import { auth } from '../Models/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseUtils from '../Models/FirebaseUtils';
import { appUser } from '../Models/Globals';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import PostUtils from '../Models/PostUtils';


export default function LoginPage() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginUser = async (email, password) => {
    
        if (!(email && password)) {
            setError('Email and password fields are required');
            return;
        }
    
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                appUser.setEmail(email);
                FirebaseUtils.getUserByEmail(email)
                    .then((result) => {
                        appUser.setUsername(result[0].username);
                        appUser.setId(result[0].id)
                        navigation.navigate(ROUTES.HOME);
                    }).catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message)
            });
    }

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
        text:{
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
        }
    });
    
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>SIGN IN</Text>
                    <GNTextInput
                        placeholder='Email'
                        iconName="mail-outline"
                        iconNameFocused="mail"
                        onChangeText={(email) => setEmail(email.trim())}
                        animation="true" />
                    <GNTextInputPassword
                        placeholder='Password'
                        iconName="lock-closed-outline"
                        iconNameFocused="lock-closed"
                        onChangeText={(password) => setPassword(password.trim())}
                        animation="true"
                        marginBottom={15} />
                    <Text 
                        style={styles.forgotPasswordLink} 
                        onPress={() => {}}>
                            Forgot password?
                    </Text>
                    <GNButton
                        title={"SIGN IN"}
                        onPress={() => {handleLoginUser(email, password)}}
                    />
                    <Text style={styles.errorText}>{error}</Text>
                    <Text style={styles.text}>
                        Don't have already an account?
                        <Text style={styles.link} onPress={() => {navigation.navigate(ROUTES.REGISTER)}}> Sign up now!</Text>
                    </Text>
                    <StatusBar style="dark" />
                </View>
            </View>
        </SafeAreaView>
    )
};