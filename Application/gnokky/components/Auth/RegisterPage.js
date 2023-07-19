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
import { handleRegister } from './AuthUtils';
import { COLORS, ROUTES, IMAGES } from '../Models/Globals';

export default function RegisterPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const logo = IMAGES.LOGO;

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
    errorText: {
      color: '#F00',
      textAlign: 'center',
      marginVertical: 35,
    },
    text: {
      textAlign: 'center',
      color: COLORS.secondText,
    },
    link: {
      color: COLORS.elements,
      fontWeight: 'bold',
    },
    title: {
      color: COLORS.elements,
      fontSize: 65,
      marginBottom: 80,
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
            <Text style={styles.title}>SIGN UP</Text>
            <GNTextInput
              placeholder="Username"
              iconName="person-outline"
              iconNameFocused="person"
              onChangeText={setUsername}
              animation="true"
            />
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
            />
            <GNTextInputPassword
              placeholder="Confirm Password"
              iconName="lock-closed-outline"
              iconNameFocused="lock-closed"
              onChangeText={setPassword2}
              animation="true"
              marginBottom={45}
            />
            <GNButton
              title="SIGN UP"
              onPress={() =>
                handleRegister(username, email, password, password2, navigation, setError)
              }
            />
            <Text></Text>
            <Text style={styles.text}>
              Already have an account?
              <Text
                style={styles.link}
                onPress={() => {
                  navigation.navigate(ROUTES.LOGIN);
                }}
              >
                {' '}
                Sign in!
              </Text>
            </Text>
            {error}
            <StatusBar style="dark" />
          </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
