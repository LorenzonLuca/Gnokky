import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, TouchableHighlight   } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, appUser } from '../Models/Globals';
import GNProfileImage from '../GN/GNProfileImage';
import GNTextInputMultiLine from '../GN/GNTextInputMultiLine';
import NewPostUtils from './NewPostUtils'
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native-elements';
import * as VideoPicker from 'expo-image-picker';
import { Video } from 'expo-av';
// import * as FileSystem from 'expo-file-system';
import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { db } from "../Models/Firebase"
import { storage } from '../Models/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function NewPostPage({ navigation, onCancel }) {
  const [cityInfo, setCityInfo] = useState("");
  const [locationIcon, setLocationIcon] = useState("location-outline");

  const handleSetCityInfo = (infos) => {
    if(cityInfo == ""){
      setCityInfo(infos);
      setLocationIcon("location");
    }else{
      setCityInfo("");
      setLocationIcon("location-outline");
    }
  }

  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const selectMedia = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      alert('Permission to access media library denied');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!pickerResult.canceled) {
      setMediaUri(pickerResult.assets[0].uri);
      setMediaType(pickerResult.assets[0].type);
    }
  };

  const uploadMedia = async () => {
    if (mediaUri && mediaType) {
      // const response = await fetch(c);
      // const blob = await response.blob();

      // const fileName = `${mediaType}_${Date.now()}`;
      // const ref = storage.ref().child(`${mediaType}s/${fileName}`);

      // await ref.put(blob);

      // const downloadUrl = await ref.getDownloadURL();
      // console.log(`${mediaType} URL:`, downloadUrl);

      try {
        const response = await fetch(mediaUri);
        const blob = await response.blob();

        const fileName = `${mediaType}_${Date.now()}`;
        const storageRef = ref(storage, `posts/${mediaType}s/${fileName}`);

        await uploadBytes(storageRef, blob);

        const downloadUrl = await getDownloadURL(storageRef);
        console.log(`${mediaType} URL:`, downloadUrl);

      } catch (e) {
          console.log("error uploading media in storage: " + e);
      }

      try{

      } catch (e) {
        console.log("error uploading media in firebase: " + e);
      }

      // Esegui altre operazioni con l'URL del media, come salvarlo nel database
    }
  };



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
      flexDirection: 'row',
      width: '100%',
    },
    iconButton: {
      justifyContent: 'center',
      height: '100%',
      paddingHorizontal: 10,
      marginHorizontal: 10,
      borderRadius: 20,
    }
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GNAppBar iconLeading='close-outline' onPressLeading={() => { onCancel() }} iconTrailing='checkmark-outline' onPressTrailing={uploadMedia} />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.body}>
            <View style={{ padding: 10 }}>
              <GNProfileImage selectedImage={appUser.profilePic} size={50} /> 
            </View>
            <View style={{ flex: 1, padding: 10}}>
                <GNTextInputMultiLine placeholder={"Caption..."} />
                {mediaUri && mediaType === 'image' && (
                  <Image source={{ uri: mediaUri }} style={{height: '75%', borderRadius: 15, borderColor: COLORS.thirdText, borderWidth: 1 }} />
                )}
                {mediaUri && mediaType === 'video' && (
                  <Video
                    source={{ uri: mediaUri }}
                    style={{height: '75%', borderRadius: 15, borderColor: COLORS.thirdText, borderWidth: 1 }}
                    useNativeControls
                    resizeMode="contain"
                  />
                )}
                <Text>{cityInfo}</Text>
            </View>
        </View>
        <View style={{ borderColor: 'black', backgroundColor: 'white', borderWidth: 1, width: '100%', flexDirection: 'row', alignItems: 'center', height: 50}}>
          <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)" onPress={selectMedia} style={styles.iconButton}>
              <Ionicons name="image-outline" size={33} color="black" />
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)" onPress={() => console.log('Icona camera')} style={styles.iconButton}>
              <Ionicons name="camera-outline" size={33} color="black" />
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.05)" onPress={async () => {handleSetCityInfo(await NewPostUtils.getUserLocation()); }} style={styles.iconButton}>
              <Ionicons name={locationIcon} size={33} color="black" />
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}