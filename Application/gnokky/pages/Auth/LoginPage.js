import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';

import styles from '../../styles/Styles';
import Button from '../../components/Button';


export default function LoginPage({ navigation }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleInputChangeUsername = (inputText) => {
        setUsername(inputText);
    }

    const handleInputChangePassword = (inputText) => {
        setPassword(inputText);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in</Text>

            <TextInput
                style={styles.textInputStyle}
                placeholder="username"
                onChangeText={handleInputChangeUsername} />
            <TextInput
                style={styles.textInputStyle}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={handleInputChangePassword} />

            <Button text={"Next"} style={{ marginTop: 40 }}></Button>
            <Button text={"Forgot Password?"}></Button>

            <Text style={{ color: '#fff', marginTop: 75 }}>
                Don't have already an account?
                <Text style={{ color: '#48B8D0' }} onPress={() => navigation.navigate("Register")}> Register now</Text>
            </Text>
            <StatusBar style="light" />
        </View>
    )
}