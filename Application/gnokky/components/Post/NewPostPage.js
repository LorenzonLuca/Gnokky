import { View, Text, Modal, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
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
import * as VideoPicker from 'expo-image-picker';
import { Video } from 'expo-av';
import GNCamera from '../GN/GNCamera';
import { useTranslation } from 'react-i18next';

export default function NewPostPage({ navigation, onClose }) {
    const { t } = useTranslation();
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
        await PostUtils.insertNewPost(mediaUri, mediaType, caption, locationInfo);
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
        },
        media: {
            marginBottom: 10,
            aspectRatio: 1,
            borderRadius: 15,
            borderColor: COLORS.thirdText,
        },
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
                            placeholder={t('caption')}
                            onChangeText={handleInputChangeCaption}
                        />
                        {mediaUri && mediaType === 'image' && (
                            <Image source={{ uri: mediaUri }} style={styles.media} />
                        )}
                        {mediaUri && mediaType === 'video' && (
                            <Video
                                source={{ uri: mediaUri }}
                                style={styles.media}
                                useNativeControls
                                resizeMode="contain"
                            />
                        )}
                        <Text>{locationInfo}</Text>
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