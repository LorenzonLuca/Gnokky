import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Modal, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GNAppBar from '../GN/GNAppBar';
import { COLORS } from '../Models/Globals';
import i18next, { languageResources } from '../../services/i18next';
import { useTranslation } from 'react-i18next';
import languageList from '../../services/languagesList.json';

export default function Settings() {
  const { t } = useTranslation();
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
            <GNAppBar title="Languages" iconLeading='close-outline' onPressLeading={() => setIsVisible(false)} iconTrailing=''/>
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
        <Button style={{backgroundColor: 'red'}} title={t('change-language')} onPress={() => setIsVisible(true)} />
      </View>
      <View style={{ padding: 16 }}>
        <Button style={{backgroundColor: 'red'}} title={'delete account'} onPress={() => setIsVisible(true)} />
      </View>
      <View style={{ padding: 16 }}>
        <Button style={{backgroundColor: 'red'}} title={'logout'} onPress={() => setIsVisible(true)} />
      </View>
    </SafeAreaView>
  );
}
