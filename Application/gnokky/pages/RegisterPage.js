import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';

import styles from '../styles/Styles';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Button from '../components/Button';

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

            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (emailRegex.test(email)) {
                if (password == password2) {

                    await createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredentials) => {
                            console.log(userCredentials.user);
                        })
                        .catch((error) => {
                            if (error.code === 'auth/weak-password') {
                                setError("The Password is to weak, try another one!");
                            } else if (error.code === "auth/email-already-in-use") {
                                setError("Email already in use!");
                            } else {
                                console.log(error);
                            }
                        })

                } else {
                    setError("Passwords doesn't matching!")
                }
            } else {
                setError("Insert a valid email address!");
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

            <TextInput
                style={styles.textInputStyle}
                placeholder="username"
                onChangeText={handleInputChangeUsername} />
            <TextInput
                style={styles.textInputStyle}
                placeholder="email"
                onChangeText={handleInputChangeEmail} />
            <TextInput
                style={styles.textInputStyle}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={handleInputChangePassword} />
            <TextInput
                style={styles.textInputStyle}
                placeholder="confirm password"
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