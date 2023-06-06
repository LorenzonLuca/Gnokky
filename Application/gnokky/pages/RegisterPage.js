import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput } from 'react-native';

import styles from '../styles/Styles';

export default function RegisterPage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>

            <TextInput style={styles.textInputStyle} placeholder="username"></TextInput>
            <TextInput style={styles.textInputStyle} placeholder="email"></TextInput>
            <TextInput style={styles.textInputStyle} placeholder="password" secureTextEntry={true}></TextInput>
            <TextInput style={styles.textInputStyle} placeholder="confirm password"></TextInput>

            <Text style={{ color: '#fff', marginTop: 75 }}>
                Already have an account?
                <Text style={{ color: '#48B8D0' }} onPress={() => navigation.navigate("Login")}>Sign in now</Text>
            </Text>
            <StatusBar style="light" />
        </View>
    )
}