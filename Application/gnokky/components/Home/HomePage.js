import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';


import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { appUser } from '../../components/Models/Globals';
import { COLORS } from '../../components/Models/Globals';
import Post from '../GN/Post';

export default function HomePage({ navigation }) {
  appUser.getValueAndUpdate();

  const messageClick = () => {
    navigation.navigate("Chat")
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
      flex: 1,
      padding: 5,
      width: '100%',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GNAppBar />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.body}>
          <Post caption='sono un post hard coded' locationInfo='Belfast' mediaType='image' mediaUri='https://firebasestorage.googleapis.com/v0/b/gnokky-966fe.appspot.com/o/provastorage%2Fposts%2Fprovastorage_image_1686822777972?alt=media&token=d679d82f-ea36-4fdd-8a6c-ed9ab72f136d'/>
          <Post caption='sono un post hard coded' locationInfo='Belfast' mediaType='image' mediaUri='https://firebasestorage.googleapis.com/v0/b/gnokky-966fe.appspot.com/o/provastorage%2Fposts%2Fprovastorage_image_1686822777972?alt=media&token=d679d82f-ea36-4fdd-8a6c-ed9ab72f136d'/>
          <Post caption='sono un post hard coded' locationInfo='Belfast' mediaType='image' mediaUri='https://firebasestorage.googleapis.com/v0/b/gnokky-966fe.appspot.com/o/provastorage%2Fposts%2Fprovastorage_image_1686822777972?alt=media&token=d679d82f-ea36-4fdd-8a6c-ed9ab72f136d'/>
          <Post caption='sono un post hard coded' locationInfo='Belfast' mediaType='image' mediaUri='https://firebasestorage.googleapis.com/v0/b/gnokky-966fe.appspot.com/o/provastorage%2Fposts%2Fprovastorage_image_1686822777972?alt=media&token=d679d82f-ea36-4fdd-8a6c-ed9ab72f136d'/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}