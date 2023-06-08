import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';

import styles from '../../styles/Styles';
import GNButton from '../../components/GNButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Models/Firebase';
import { appUser } from '../../Models/Globals';


export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState("");

    const handleInputChangeUsername = (inputText) => {
        setEmail(inputText);
    }

    const handleInputChangePassword = (inputText) => {
        setPassword(inputText);
    }

    const handleLoginUser = async () => {
        if (checkValue(email) && checkValue(password)) {
            setEmail(email.trim());
            setPassword(password.trim());

            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    appUser.setType("Login");
                    console.log("Set type to login: " + appUser.typeSignIn);
                })
                .catch((error) => {
                    console.log(error.message);
                    setError("Login incorrect!")
                })
        }
    }

    const checkValue = (value) => {
        return (value !== null && value !== "");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in</Text>

            <TextInput
                style={styles.textInputStyle}
                placeholder="email"
                onChangeText={handleInputChangeUsername} />
            <TextInput
                style={styles.textInputStyle}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={handleInputChangePassword} />

            <GNButton text={"Next"} style={{ marginTop: 40 }} onPress={handleLoginUser}></GNButton>
            <GNButton text={"Forgot Password?"}></GNButton>

            <Text style={{ color: '#f00' }}>{error}</Text>

            <Text style={{ color: '#fff', marginTop: 75 }}>
                Don't have already an account?
                <Text style={{ color: '#48B8D0' }} onPress={() => navigation.navigate("Register")}> Register now</Text>
            </Text>
            <StatusBar style="light" />
        </View>
    )
}