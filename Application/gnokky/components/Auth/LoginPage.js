import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GNButton from '../GN/GNButton';
import GNTextInput from '../GN/GNTextInput';
import GNTextInputPassword from '../GN/GNTextInputPassword';
import { handleLogin } from './AuthUtils';
import { COLORS, ROUTES, IMAGES } from '../Models/Globals';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const logo = IMAGES.LOGO;

  const styles = StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
    },
    errorText: {
      color: '#F00',
      textAlign: 'center',
      marginVertical: 35,
    },
    text: {
      textAlign: 'center',
      color: COLORS.secondText,
    },
    forgotPasswordLink: {
      color: COLORS.elements,
      fontWeight: 'bold',
      textAlign: 'right',
      marginBottom: 40,
      alignSelf: 'flex-end',
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
      fontFamily: 'mnst-bold',
    },
    keyboard: {
      flex: 1,
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 80,
      height: 80,
      alignSelf: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboard}
        >
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Image source={logo} style={styles.image} />
            <Text style={styles.title}>SIGN IN</Text>
            <GNTextInput
              placeholder="Email"
              iconName="mail-outline"
              iconNameFocused="mail"
              onChangeText={setEmail}
              animation="true"
            />
            <GNTextInputPassword
              placeholder="Password"
              iconName="lock-closed-outline"
              iconNameFocused="lock-closed"
              onChangeText={setPassword}
              animation="true"
              marginBottom={15}
            />
            <View style={{width: '75%'}}>
                <Text style={styles.forgotPasswordLink} onPress={() => {}}>
                Forgot password?
                </Text>
            </View>
            <GNButton
              title={'SIGN IN'}
              onPress={() => {
                handleLogin(email, password, navigation, setError);
              }}
            />
            <Text></Text>
            <Text style={styles.text}>
              Don't have already an account?
              <Text
                style={styles.link}
                onPress={() => {
                  navigation.navigate(ROUTES.REGISTER);
                }}
              >
                {' '}
                Sign up now!
              </Text>
            </Text>
            {error}
            <StatusBar style="dark" />
          </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
