import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../Models/Globals';


export default function NewPostPage({ navigation, onCancel }) {


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
      flex: 1,
      padding: 20,
    },
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GNAppBar iconLeading='close-outline' onPressLeading={() => { onCancel() }} iconTrailing='checkmark-outline' />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.body}>
          <Text>New Post Page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}