import { View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, ImageBackground } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { COLORS, ROUTES } from '../Models/Globals';

import { auth } from '../Models/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseUtils from '../Models/FirebaseUtils';
import { appUser } from '../Models/Globals';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import PostUtils from '../Models/PostUtils';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NotificationsPage() {

  const hanldeSignOut = async () => {
    await signOut(auth)
    .then(() => console.log("LOGGEDOUT"))
    .catch((error) => Alert(error));
  }


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
    }
  });


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.body}>
          <TouchableOpacity 
            style={{borderColor: 'blue', borderWidth: 1}}
            onPress={() => {hanldeSignOut()}}>
            <Text>SUCA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}