import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, ImageBackground } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { COLORS, ROUTES } from '../Models/Globals';

import FirebaseUtils from '../Models/FirebaseUtils';
import { appUser } from '../Models/Globals';
import PostUtils from '../Models/PostUtils';
import { Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import 'react-native-gesture-handler';


export default function AdminPage() {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
    },
    body: {
      // flex: 1,
      padding: 20,
    },
  });


  return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.body}>
            <Text>SIUMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}