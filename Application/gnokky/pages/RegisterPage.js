import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';

import styles from '../styles/Styles';

export default function RegisterPage({ navigation }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [email, setEmail] = useState(null);

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

            <View style={[styles.button.buttonContainer, { marginTop: 40 }]}>
                <Pressable style={styles.button.button}>
                    <Text style={styles.button.buttonLabel}>Next</Text>
                </Pressable>
            </View>

            <Text style={{ color: '#fff', marginTop: 75 }}>
                Already have an account?
                <Text style={{ color: '#48B8D0' }} onPress={() => navigation.navigate("Login")}> Sign in now</Text>
            </Text>
            <StatusBar style="light" />
        </View>
    )
}