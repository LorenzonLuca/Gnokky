import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

import styles from '../../styles/Styles';
import { auth } from '../../Models/Firebase';
import FirebaseUtils from '../../Models/FirebaseUtils';
import { appUser } from '../../Models/Globals';

export default function WaitingPage({ navigation }) {
    console.log("waiting page");

    useEffect(() => {
        if (auth.currentUser.emailVerified) {
            navigation.navigate("HomeTemplate");
        }
        const intervalCheck = setInterval(() => {
            auth.currentUser.reload()
                .then(() => {
                    if (auth.currentUser.emailVerified) {
                        console.log(auth.currentUser.emailVerified);
                        FirebaseUtils.insertUser(appUser.username, appUser.email);
                        clearInterval(intervalCheck);
                        navigation.navigate("ProfileManagement", { title: "Create profile" });
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
                <Text style={styles.title2}>Please verify your email!</Text>
                <Text style={styles.paragraph}>waiting...</Text>
            </View>
            <StatusBar style="light" />
        </View>
    );

}