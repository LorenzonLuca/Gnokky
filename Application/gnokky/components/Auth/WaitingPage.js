import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Modal } from 'react-native';
import { useState, useEffect } from 'react';

import styles from '../../styles/Styles';
import { auth } from '../Models/Firebase';
import FirebaseUtils from '../Models/FirebaseUtils';
import { appUser } from '../Models/Globals';
import ProfileManagement from '../Profile/ProfileManagement';

export default function WaitingPage({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    console.log("waiting page");

    useEffect(() => {
        const intervalCheck = setInterval(() => {
            auth.currentUser.reload()
                .then(() => {
                    if (auth.currentUser.emailVerified) {
                        console.log(auth.currentUser.emailVerified);
                        FirebaseUtils.insertUser(appUser.username, appUser.email);
                        clearInterval(intervalCheck);
                        setModalVisible(true)
                    }
                });
        }, 2000);
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title2}>Please verify your email!</Text>
                <Text style={styles.paragraph}>waiting...</Text>
            </View>
            <Modal visible={modalVisible} animationType="slide">
                <ProfileManagement title={"Create profile"} navigation={navigation}></ProfileManagement>
            </Modal>
            <StatusBar style="dark" />
        </View>
    );

}