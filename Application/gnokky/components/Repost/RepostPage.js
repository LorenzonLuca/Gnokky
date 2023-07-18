import { View, Modal, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, appUser } from '../Models/Globals';
import GNProfileImage from '../GN/GNProfileImage';
import GNTextInputMultiLine from '../GN/GNTextInputMultiLine';
import PostUtils from '../Models/PostUtils'
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native-elements';
import { Video } from 'expo-av';
import GNCamera from '../GN/GNCamera';
import Repost from './Repost';
import GNEmptyText from '../GN/GNEmptyText';
import { useTranslation } from 'react-i18next';

export default function RepostPage({ navigation, onClose, post }) {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const [caption, setCaption] = useState("");
  const [locationInfo, setLocationInfo] = useState("");
  const [locationIcon, setLocationIcon] = useState("location-outline");
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [submitColor, setSubmitColor] = useState("gray");
  const [openCamera, setOpenCamera] = useState(false);

  useEffect(() => {
    if (!(mediaUri && mediaType) && caption == "") {
      setSubmitColor(COLORS.thirdText);
    } else {
      setSubmitColor(COLORS.firtText);
    }
  }, [mediaUri, mediaType, caption]);

  const handleInputChangeCaption = (inputText) => {
    setCaption(inputText.trim());
  }

  const handleMediaClick = () => {
    if (post.mediaType == 'image')
      setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const handleSetLocationInfo = (infos) => {
    if (locationInfo == "") {
      setLocationInfo(infos);
      setLocationIcon("location");
    } else {
      setLocationInfo("");
    }
  }

  const handleSetCityInfo = (infos) => {
    if (cityInfo == "") {
      setCityInfo(infos);
      setLocationIcon("location");
    } else {
      setCityInfo("");
      setLocationIcon("location-outline");
    }
  }

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

  const handleUploadMedia = async () => {
    if (!(mediaUri && mediaType) && caption == "") {
      return;
    }
    onClose()
    await PostUtils.insertNewPost(mediaUri, mediaType, caption, locationInfo, post.id);
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
    },
    iconButton: {
      justifyContent: 'center',
      height: '100%',
      paddingHorizontal: 10,
      marginHorizontal: 10,
      borderRadius: 20,
    },
    media: {
      aspectRatio: 1,
      borderRadius: 15,
      borderColor: COLORS.thirdText,
      marginBottom: 10,
    },
    repostContainer: {
      flexDirection: 'row',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.thirdText,
    },
    infoContainer: {
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    mediaContainer: {
      marginVertical: 5,
      borderRadius: 15,
    },
    username: {
      marginLeft: 10,
      fontWeight: 'bold',
    },
    timestamp: {

    },
    options: {

    },
    location: {
      paddingVertical: 5,
    },
    media: {
      marginBottom: 10,
      aspectRatio: 1,
      borderRadius: 15,
      borderColor: COLORS.thirdText,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'black',
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      left: 16,
      zIndex: 1,
    },
    modalVideo: {
      flex: 1,
    },
    border: {
      // borderColor: 'black',
      // borderWidth: 1,
    },
    bottomSheetSubtitle: {
      fontWeight: "bold",
      color: COLORS.firtText,
      fontSize: 14,
    },
    bottomSheetRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'flex-start',
      marginVertical: 5,
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GNAppBar iconLeading='close-outline' onPressLeading={() => { onClose() }} iconTrailing='checkmark-outline' onPressTrailing={handleUploadMedia} iconTrailingColor={submitColor} />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.body}>
          <View style={{ padding: 10 }}>
            <GNProfileImage selectedImage={appUser.profilePic} size={50} />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <GNTextInputMultiLine
              marginBottom={10}
              placeholder={t('caption')}
              onChangeText={handleInputChangeCaption}
            />
            {mediaUri && mediaType === 'image' && (
              <Image
                source={{ uri: mediaUri }}
                style={styles.media}
                resizeMode="cover"
              />
            )}
            {mediaUri && mediaType === 'video' && (
              <Video
                source={{ uri: mediaUri }}
                style={styles.media}
                useNativeControls
                resizeMode="contain"
              />
            )}
            <GNEmptyText style={{ marginBottom: 10 }} text={locationInfo} />
            {/* REPOST */}
            <Repost repost={post} postHasMedia={mediaUri} />
            {/* END REPOST */}
          </View>
        </View>
        <View style={{ borderColor: 'black', backgroundColor: 'white', borderWidth: 1, width: '100%', flexDirection: 'row', alignItems: 'center', height: 50 }}>
          <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)" onPress={selectMedia} style={styles.iconButton}>
            <Ionicons name="image-outline" size={33} color="black" />
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)" onPress={() => setOpenCamera(true)} style={styles.iconButton}>
            <Ionicons name="camera-outline" size={33} color="black" />
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.05)" onPress={async () => { handleSetLocationInfo(await PostUtils.getUserLocation()); }} style={styles.iconButton}>
            <Ionicons name={locationIcon} size={33} color="black" />
          </TouchableHighlight>
        </View>
      </ScrollView>
      <Modal visible={openCamera} animationType="slide">
        <GNCamera
          onSave={(photo) => {
            setMediaUri(photo.uri);
            setMediaType('image');
            setOpenCamera(false);
          }}
          onCancel={() => {
            setOpenCamera(false);
          }} />
      </Modal>
    </SafeAreaView >

  );
}