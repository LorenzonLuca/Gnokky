import { auth } from '../Models/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseUtils from '../Models/FirebaseUtils';
import { appUser } from '../Models/Globals';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import NewPostUtils from '../Post/NewPostUtils';


export const handleLogin = async (email, password, navigation, setError) => {

    email = email.trim();
    password = password.trim();

    if (!(email && password)) {
        setError('Email and password fields are required');
        return;
    }

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            appUser.setEmail = email;
            FirebaseUtils.getUserByEmail(email)
                .then((result) => {
                    appUser.setUsername(result[0].username);
                    appUser.setId(result[0].id)
                    navigation.navigate('NavigatorTab');
                }).catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error.message);
            setError(error.message)
        });
}

export const handleRegister = async (username, email, password, password2, navigation, setError) => {
    username = username.trim();
    email = email.trim();
    password = password.trim();
    password2 = password2.trim();

    if (!(username && email && password && password2)) {
        setError('All fields are required. Insert valid values!');
        return;
    }

    if (password != password2) {
        setError('Passwords do not match!');
        return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            sendEmailVerification(user)
                .then(() => {
                    appUser.setUsername(username);
                    appUser.setEmail(email);
                    navigation.navigate('Waiting');
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
            setError(error.message);
            appUser.setUsername(null);
            appUser.setEmail(null);
        });
}
