import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput } from 'react-native';

import styles from '../styles/Styles';


export default function LoginPage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in</Text>

            <TextInput style={styles.textInputStyle} placeholder="username"></TextInput>
            <TextInput style={styles.textInputStyle} placeholder="password" secureTextEntry={true}></TextInput>

            <Text style={{ color: '#fff', marginTop: 75 }}>
                Don't have already an account?
                <Text style={{ color: '#48B8D0' }} onPress={() => navigation.navigate("Register")}>Register now</Text>
            </Text>
            <StatusBar style="light" />
        </View>
    )
}