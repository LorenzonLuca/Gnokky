import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import GNButton from '../GN/GNButton';
import GNTextInput from '../GN/GNTextInput';
import GNTextInputPassword from '../GN/GNTextInputPassword';
import { handleLogin } from './AuthUtils';
import { StyleSheet } from 'react-native';
import { COLORS, ROUTES, appUser } from '../Models/Globals';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem('userID');
        if (value !== null) {
          console.log("ORCABOIA");
          appUser.setId(value);
          await appUser.getValueAndUpdate();
          navigation.navigate(ROUTES.HOME)
        }
      } catch (e) {
        console.log("Error while trying to get value from async storage: ", e);
      }
    };

    getUserData();
  }, [])

  const styles = StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollContainer: {
      flexGrow: 1,
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
    forgotPasswordLink: {
      color: COLORS.elements,
      fontWeight: 'bold',
      textAlign: 'right',
      marginBottom: 40,
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
    }
  });

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
        {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>SIGN IN</Text>
            <GNTextInput
              placeholder='Email'
              iconName="mail-outline"
              iconNameFocused="mail"
              onChangeText={setEmail}
              animation="true"
            />
            <GNTextInputPassword
              placeholder='Password'
              iconName="lock-closed-outline"
              iconNameFocused="lock-closed"
              onChangeText={setPassword}
              animation="true"
              marginBottom={15}
            />
            <Text style={styles.forgotPasswordLink} onPress={() => { }}>
              Forgot password?
            </Text>
            <GNButton
              title={"SIGN IN"}
              onPress={() => {
                handleLogin(email, password, navigation, setError);
              }}
            />
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.text}>
              Don't have an account yet?
              <Text
                style={styles.link}
                onPress={() => {
                  navigation.navigate(ROUTES.REGISTER);
                }}
              >
                Sign up now!
              </Text>
            </Text>
            <StatusBar style="dark" />
          </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}


