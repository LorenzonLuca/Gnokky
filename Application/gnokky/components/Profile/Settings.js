import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, FlatList, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GNAppBar from '../GN/GNAppBar';
import GNButton from '../GN/GNButton';
import { COLORS, appUser, ROUTES } from '../Models/Globals';
import i18next, { languageResources } from '../../services/i18next';
import { useTranslation } from 'react-i18next';
import languageList from '../../services/languagesList.json';

import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Models/Firebase';


export default function Settings() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);

    const changeLanguage = async (lng) => {
        try {
            await AsyncStorage.setItem('lng', lng);
            i18next.changeLanguage(lng);
            setIsVisible(false);
        } catch (e) {
            console.log("Error while trying to set language", e);
        }
    }

    const handleLogout = async () => {
        await signOut(auth)
            .then(async () => {
                await AsyncStorage.removeItem("userID");
                appUser.resetAllValues();
                DeviceEventEmitter.emit("logout", {})
                // navigation.navigate(ROUTES.LOGIN)
                console.log("LOGGEDOUT")
            })
            .catch((error) => console.log(error));
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        languageItem: {
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.thirdText,
        },
        languageText: {
            fontSize: 16,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Modal animationType='fade' visible={isVisible} onRequestClose={() => setIsVisible(false)}>
                <View style={styles.header}>
                    <GNAppBar title="Languages" iconLeading='close-outline' onPressLeading={() => setIsVisible(false)} iconTrailing='' />
                </View>
                <FlatList
                    data={Object.keys(languageResources)}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.languageItem}
                            onPress={() => changeLanguage(item)}
                        >
                            <Text style={styles.languageText}>{languageList[item].nativeName}</Text>
                        </TouchableOpacity>
                    )}
                />
            </Modal>
            <View style={{ padding: 16 }}>
                <GNButton width='100%' title={t('change-language')} onPress={() => setIsVisible(true)} />
            </View>
            <View style={{ padding: 16 }}>
                <GNButton width='100%' title={'Logout'} onPress={() => handleLogout()} />
            </View>
            <View style={{ padding: 16 }}>
                <GNButton width='100%' title={'Delete account'} onPress={() => setIsVisible(true)} backgroundColor={COLORS.error} />
            </View>
        </SafeAreaView>
    );
}
