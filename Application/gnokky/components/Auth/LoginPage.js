import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView} from 'react-native';
import { useState } from 'react';
import GNButton from '../GN/GNButton';
import GNTextInput from '../GN/GNTextInput';
import GNTextInputPassword from '../GN/GNTextInputPassword';
import { handleLogin } from './AuthUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from 'react-native';
import { COLORS } from '../Models/Globals';


export default function LoginPage({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>SIGN IN</Text>
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
                    <Text 
                        style={{ color: '#F8D154', marginBottom: 40, textAlign: 'right' }} 
                        onPress={() => {}}>
                            Forgot password?
                    </Text>
                    <GNButton
                        title={"SIGN IN"}
                        onPress={() => {handleLogin(email, password, navigation, setError)}}
                    />
                    <Text style={{ color: '#F00', textAlign: 'center', marginTop: 20 }}>{error}</Text>
                    <Text style={{ color: COLORS.secondText, marginTop: 55, textAlign: 'center' }}>
                        Don't have already an account?
                        <Text style={styles.link} onPress={() => {navigation.navigate("Register")}}> Sign up now!</Text>
                    </Text>
                    <StatusBar style="light" />
                </View>
            </View>
        </SafeAreaView>
    )
};

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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
    },
    text:{
        color: COLORS.textGray,
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
    },
    title2: {
        color: '#fff',
        fontSize: 35,
        margin: 20,
    },
    title3: {
        color: '#F8D154',
        fontSize: 25,
        marginTop: 20,
        textAlign: 'center',
        fontFamily: 'mnst-bold'
    },
    paragraph: {
        color: '#fff',
        fontSize: 25,
        margin: 20,
    },
});
