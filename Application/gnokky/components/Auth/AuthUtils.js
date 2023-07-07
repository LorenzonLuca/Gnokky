import { auth } from '../Models/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseUtils from '../Models/FirebaseUtils';
import { appUser } from '../Models/Globals';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from '../Models/Globals';
import GNErrorModal from '../GN/GNErrorModal';
import { AUTH_ERROR } from '../Models/FirebaseErrorManager';

export const handleLogin = async (email, password, navigation, setError) => {


    email = email.trim();
    password = password.trim();

    if (!(email && password)) {
        setError(
            <GNErrorModal
                title={"Failed to login"}
                message={"Email and password fields are required"}
                onClose={() => setError(<></>)}
            />
        );
        return;
    }



    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (email == "admin@sium.com") {
                navigation.navigate(ROUTES.ADMIN_NAVIGATOR);
            } else {
                appUser.setEmail(email);
                FirebaseUtils.getUserByEmail(email)
                    .then((result) => {
                        appUser.setUsername(result[0].username);
                        appUser.setId(result[0].id);
                        storeUserData(result[0].id);
                        navigation.navigate(ROUTES.BOTTOM_NAVIGATOR);
                    }).catch((error) => {
                        console.log(error);
                    });
            }
        })
        .catch((error) => {
            console.log(error.code);

            setError(
                <GNErrorModal
                    title={"Failed to login"}
                    message={AUTH_ERROR.get(error.code)}
                    onClose={() => setError(<></>)}
                />
            );
        });
}

export const handleRegister = async (username, email, password, password2, navigation, setError) => {
    username = username.trim();
    email = email.trim();
    password = password.trim();
    password2 = password2.trim();

    if (!(username && email && password && password2)) {
        setError(
            <GNErrorModal
                title={"Failed to Register "}
                message={"All fields are required. Insert valid values!"}
                onClose={() => setError(<></>)}
            />
        );
        return;
    }

    if (password != password2) {
        setError(
            <GNErrorModal
                title={"Failed to Register "}
                message={'Passwords do not match!'}
                onClose={() => setError(<></>)}
            />
        );
        return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            sendEmailVerification(user)
                .then(() => {
                    appUser.setUsername(username);
                    appUser.setEmail(email);
                    navigation.navigate(ROUTES.VERIFY_EMAIL);
                })
                .catch((error) => {
                    console.log("errore nel settare la madonna (primo then) ", error);
                });
        })
        .catch((error) => {
            console.log("errore nel settare la madonna (secondo then) ", error);
            setError(
                <GNErrorModal
                    title={"Failed to Register"}
                    message={AUTH_ERROR.get(error.code)}
                    onClose={() => setError(<></>)}
                />
            );
            appUser.setUsername(null);
            appUser.setEmail(null);
        });
}

const storeUserData = async (value) => {
    try {
        await AsyncStorage.setItem('userID', value);
    } catch (e) {
        console.log("error while trying to save user id in async storage");
    }
};
