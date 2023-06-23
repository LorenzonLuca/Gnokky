import { StatusBar } from 'expo-status-bar';
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from '../Models/Firebase';
import FirebaseUtils from '../Models/FirebaseUtils';
import { appUser } from '../Models/Globals';
import ProfileManagement from '../Profile/ProfileManagement';
import { COLORS } from '../Models/Globals';
import { SafeAreaView } from 'react-native';


export default function WaitingPage({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    console.log("sono entrato nella waiting page diocan")

    useEffect(() => {
        console.log("sono entrato nello use effect diocan")
        const intervalCheck = setInterval(() => {
            auth.currentUser.reload()
                .then(() => {
                    if (auth.currentUser.emailVerified) {
                        console.log("TUAMADRELECCACIOLE")
                        console.log(auth.currentUser.emailVerified);
                        FirebaseUtils.insertUser(appUser.username, appUser.email);
                        clearInterval(intervalCheck);
                        setModalVisible(true)
                    }
                });
        }, 2000);
    }, [])

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
        title: {
            color: COLORS.elements,
            fontSize: 25,
            marginBottom: 100,
            textAlign: 'center',
            fontFamily: 'mnst-bold'
        }
    });

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Please verify your email!</Text>
                    <ActivityIndicator size="large" color={COLORS.elements} />
                </View>
                <Modal visible={modalVisible} animationType="slide">
                    <ProfileManagement title={"Create profile"} navigation={navigation}></ProfileManagement>
                </Modal>
                <StatusBar style="dark" />
            </View>
        </SafeAreaView>
    );

}