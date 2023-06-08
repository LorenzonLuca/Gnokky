import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';

import styles from '../../styles/Styles';
import { auth } from '../../Models/Firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import Button from '../../components/Button';
import { appUser } from '../../Models/Globals';
import GNTextInput from '../../components/GNTextInput';

export default function RegisterPage({ navigation }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChangeUsername = (inputText) => {
        setUsername(inputText);
    }

    const handleInputChangePassword = (inputText) => {
        setPassword(inputText);
    }
    const handleInputChangePassword2 = (inputText) => {
        setPassword2(inputText);
    }

    const handleInputChangeEmail = (inputText) => {
        setEmail(inputText);
    }

    const handleRegisterUser = async () => {
        if (checkValue(username) && checkValue(email) && checkValue(password) && checkValue(password2)) {
            setUsername(username.trim());
            setEmail(email.trim());
            setPassword(password.trim());
            setPassword2(password2.trim());


            if (password == password2) {

                await createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredentials) => {
                        const user = userCredentials.user;
                        sendEmailVerification(user)
                            .then(() => {
                                appUser.setType("Register");
                                appUser.setUsername(username);
                                appUser.setEmail(email);
                                navigation.navigate("Waiting");
                            })
                            .catch((error)  => {
                                console.log(error);
                            })
                    })
                    .catch((error) => {
                        if (error.code === 'auth/weak-password') {
                            setError("The Password is to weak, try another one!");
                        } else if (error.code === "auth/email-already-in-use") {
                            setError("Email already in use!");
                        } else if (error.code === "auth/invalid-email") {
                            setError("Email not valid!")
                        } else {
                            console.log(error);
                        }
                        appUser.setUsername(null);
                        appUser.setEmail(null);
                    })

            } else {
                setError("Passwords doesn't matching!")
            }
        } else {
            setError("Some values are missing!");
        }
    }

    const checkValue = (value) => {
        return (value !== null && value !== "");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>

            <GNTextInput
                placeholder='Username'
                iconName="person-outline"
                iconNameFocused="person"
                onChangeText={handleInputChangeUsername} />
            <GNTextInput
                placeholder='Email'
                iconName="mail-outline"
                iconNameFocused="mail"
                onChangeText={handleInputChangeEmail} />
            <GNTextInput
                placeholder='Password'
                iconName="lock-closed-outline"
                iconNameFocused="lock-closed"
                secureTextEntry={true}
                onChangeText={handleInputChangePassword} />
            <GNTextInput
                placeholder='Confirm Password'
                iconName="lock-closed-outline"
                iconNameFocused="lock-closed"
                secureTextEntry={true}
                onChangeText={handleInputChangePassword2} />
                
            <Button text={"Next"} onPress={handleRegisterUser} style={{ marginTop: 40 }}></Button>

            <Text style={{ color: '#f00' }}>{error}</Text>

            <Text style={{ color: '#fff', marginTop: 75 }}>
                Already have an account?
                <Text style={{ color: '#48B8D0' }} onPress={() => navigation.navigate("Login")}> Sign in now</Text>
            </Text>

            <StatusBar style="light" />
        </View >
    )
}