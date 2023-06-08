import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

import styles from '../../styles/Styles';
import { auth } from '../../Models/Firebase';
import AuthUtils from '../../Models/AuthUtils';

export default function WaitingPage({ navigation }) {
    console.log("waiting page");

    useEffect(() => {
        const intervalCheck = setInterval(() => {
            auth.currentUser.reload()
                .then(() => {
                    if (auth.currentUser.emailVerified) {
                        console.log(auth.currentUser.emailVerified);
                        AuthUtils.insertUser("ciao",auth.currentUser.email);
                        clearInterval(intervalCheck);
                        navigation.navigate("HomeTemplate");
                    }
                });
        }, 2000);

        return () => {
            clearInterval(intervalCheck);
        };
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title2}>Please verifiy your email!</Text>
                <Text style={{ color: "#fff" }}>wating...</Text>
            </View>
            <StatusBar style="light" />
        </View>
    );

}