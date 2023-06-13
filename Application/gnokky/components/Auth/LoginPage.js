import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView } from 'react-native';
import { useState } from 'react';
import styles from '../../styles/Styles';
import GNButton from '../GN/GNButton';
import GNTextInput from '../GN/GNTextInput';
import GNTextInputPassword from '../GN/GNTextInputPassword';
import { handleLogin } from './AuthUtils';


export default function LoginPage({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View>
                    <Text style={[styles.title, { marginBottom: 120 }]}>SIGN IN</Text>
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
                    <Text style={{ color: '#F8D154', marginBottom: 40, textAlign: 'right' }} onPress={() => {}}>Forgot password?</Text>
                    <GNButton
                        title={"SIGN IN"}
                        onPress={() => {handleLogin(email, password, navigation, setError)}}
                    />
                    <Text style={{ color: '#F00', textAlign: 'center', marginTop: 20 }}>{error}</Text>
                    <Text style={{ color: '#FFF', marginTop: 55, textAlign: 'center' }}>
                        Don't have already an account?
                        <Text style={{ color: '#F8D154' }} onPress={() => {navigation.navigate("Register")}}> Sign up now!</Text>
                    </Text>
                    <StatusBar style="light" />
                </View>
            </View>
        </SafeAreaView>
    )
}