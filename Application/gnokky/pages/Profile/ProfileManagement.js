import { View, Text, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GNButton from '../../components/GNButton';
import GNHeader from '../../components/GNHeader';
import GNProfileImage from '../../components/GNProfileImage';
import styles from "../../styles/Styles";
import { useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { appUser } from '../../Models/Globals';
import { storage } from '../../Models/Firebase';
import { ref, uploadBytes } from 'firebase/storage';
import GNTextInput from '../../components/GNTextInput';

export default function ProfileManagement({ navigation, route }) {
    const { title } = route.params;
    const size = 90;
    const placeholder = require('./../../assets/blank_profile.png');
    const [selectedImage, setSelectedImage] = useState(null);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [name, setName] = useState(null);
    const [surnname, setSurname] = useState(null);
    const [bio, setBio] = useState("");

    if (status === null) {
        requestPermission();
    }

    const imageRef = useRef();

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleInputChangeName = (inputText) => {
        setName(inputText);
    }

    const handleInputChangeSurname = (inputText) => {
        setSurname(inputText);
    }

    const handleInputChangeBio = (inputText) => {
        setBio(inputText);
    }

    const onSaveProfileAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                quality: 1,
            });

            console.log(localUri);
            const fileName = appUser.username + ".jpg";
            saveImageInStorage(localUri, fileName);

            if (checkValue(name) && checkValue(surnname)) {

            }
        } catch (e) {
            console.log(e);
        }
    };

    const saveImageInStorage = async (imageUri, fileName) => {
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();

            const storageRef = ref(storage, `profilespic/${fileName}`);
            await uploadBytes(storageRef, blob);
        } catch (e) {
            console.log("error uploading photo in db: " + e);
        }
    }

    const checkValue = (value) => {
        return (value !== null && value !== "");
    }

    return (
        <View style={styles.background}>
            <GNHeader title={title}></GNHeader>
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <View ref={imageRef} collapsable={false}>
                        <GNProfileImage placeholder={placeholder} size={size} selectedImage={selectedImage}></GNProfileImage>
                    </View>
                    <GNButton text={"Edit Image"} width={100} onPress={pickImageAsync}></GNButton>
                </View>
                <GNTextInput placeholder={"Name"} onChangeText={handleInputChangeName}></GNTextInput>
                <GNTextInput placeholder={"Surname"} onChangeText={handleInputChangeSurname}></GNTextInput>
                <GNTextInput placeholder={"Bio"} onChangeText={handleInputChangeBio}></GNTextInput>
                <GNButton text={"Save"} onPress={onSaveProfileAsync}></GNButton>
            </View>
        </View>
    );
}