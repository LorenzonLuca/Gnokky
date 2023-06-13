import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView } from 'react-native';
import { useState } from 'react';
import styles from '../../styles/Styles';
import GNButton from '../GN/GNButton';
import GNTextInput from '../GN/GNTextInput';
import GNTextInputPassword from '../GN/GNTextInputPassword';
import { handleRegister } from './AuthUtils';


export default function RegisterPage({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>SIGN UP</Text>

                    <GNTextInput
                        placeholder='Username'
                        iconName="person-outline"
                        iconNameFocused="person"
                        onChangeText={setUsername}
                        animation="true" />
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
                        animation="true" />
                    <GNTextInputPassword
                        placeholder='Confirm Password'
                        iconName="lock-closed-outline"
                        iconNameFocused="lock-closed"
                        onChangeText={setPassword2}
                        animation="true"
                        marginBottom={60} />

                    <GNButton
                        title={"SIGN UP"}
                        onPress={ () => handleRegister(
                            username,
                            email,
                            password,
                            password2,
                            navigation,
                            setError
                        )}
                    />

                    <Text style={{ color: '#F00', textAlign: 'center', marginTop: 20 }}>{error}</Text>

                    <Text style={{ color: '#fff', marginTop: 50, textAlign: 'center' }}>
                        Already have an account?
                        <Text style={{ color: '#F8D154' }} onPress={() => {navigation.navigate("Login")}}> Sign in!</Text>
                    </Text>

                    <StatusBar style="dark" />
                </View>
            </View >
        </SafeAreaView>
    )
}