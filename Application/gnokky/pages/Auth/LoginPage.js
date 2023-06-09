import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Feather, TextInput } from 'react-native';
import { useState } from 'react';
import styles from '../../styles/Styles';
import GNButton from '../../components/GNButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Models/Firebase';
import { appUser } from '../../Models/Globals';
import GNTextInput from '../../components/GNTextInput';
import ErrorModal from '../../components/ErrorModal';
import GNTextInputPassword from '../../components/GNTextInputPassword';
import FirebaseUtils from '../../Models/FirebaseUtils';

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

    // const [errorModalVisible, setErrorModalVisible] = useState(false);

    // const showErrorModal = () => {
    //     setErrorModalVisible(true);
    // };

    // const closeErrorModal = () => {
    //     setErrorModalVisible(false);
    // };

    // const renderErrorModal = () => {
    //     if (errorModalVisible) {
    //       return (
    //         <ErrorModal
    //           visible={errorModalVisible}
    //           onClose={closeErrorModal}
    //           title="Errore"
    //           message="Si è verificato un errore."
    //           actionText="Riprova"
    //           onAction={handleAction}
    //         />
    //       );
    //     }
    //     return null;
    //   };

    // const handleAction = () => {
    //     // Azione da eseguire quando viene premuto il pulsante di azione nel modal
    //     // Puoi personalizzare questa funzione in base alle tue esigenze
    //     closeErrorModal(); // Chiudi il modal dopo aver eseguito l'azione
    // };

    const handleLoginUser = async () => {
        if (checkValue(email) && checkValue(password)) {
            setEmail(email.trim());
            setPassword(password.trim());

            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    appUser.setEmail = email;
                    appUser.setType("Login");
                    console.log("Set type to login: " + appUser.typeSignIn);
                    FirebaseUtils.getUserByEmail(email).then((result) => {
                        appUser.setUsername(result[0].username);
                        appUser.setId(result[0].id)
                    })
                })
                .catch((error) => {
                    console.log(error.message);
                    setError("Login incorrect!")
                })
        } else {
            setError("Login incorrect!")
        }
    }

    const checkValue = (value) => {
        return (value !== null && value !== "");
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={[styles.title, {marginBottom: 120}]}>SIGN IN</Text>
                <GNTextInput
                    placeholder='Email'
                    iconName="mail-outline"
                    iconNameFocused="mail"
                    onChangeText={handleInputChangeUsername}
                    animation="true" />
                <GNTextInputPassword
                    placeholder='Password'
                    iconName="lock-closed-outline"
                    iconNameFocused="lock-closed"
                    onChangeText={handleInputChangePassword}
                    animation="true"
                    marginBottom={15} />

                <Text style={{ color: '#F8D154', marginBottom: 40, textAlign: 'right' }} onPress={() => navigation.navigate("Register")}>
                    Forgot password?
                </Text>

                <GNButton
                    title={"SIGN IN"}
                    onPress={handleLoginUser}
                />

                <Text sstyle={{ color: '#f00' }}>{error}</Text>

                <Text style={{ color: '#fff', marginTop: 55, textAlign: 'center' }}>
                    Don't have already an account?
                    <Text style={{ color: '#F8D154' }} onPress={() => navigation.navigate("Register")}> Sign up now!</Text>
                </Text>
                <StatusBar style="light" />
            </View>
        </View>
    )
}