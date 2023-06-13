import { View, Text, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GNButton from '../../components/GNButton';
import GNProfileImage from '../../components/GNProfileImage';
import styles from "../../styles/Styles";
import { useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { appUser } from '../../Models/Globals';
import { storage } from '../../Models/Firebase';
import { ref, uploadBytes } from 'firebase/storage';
import GNTextInput from '../../components/GNTextInput';
import FirebaseUtils from '../../Models/FirebaseUtils';
import GNTextInputMultiLine from '../../components/GNTextInputMultiLine';

export default function ProfileManagement({ navigation, route }) {
    const { title } = route.params;
    const size = 90;
    const placeholder = require('./../../assets/blank_profile.png');
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [bio, setBio] = useState(null);

    if (status === null) {
        requestPermission();
    }

    if (appUser.profilePic && selectedImage === null) {
        setSelectedImage(appUser.profilePic);
    }
    if (appUser.name && name === null) {
        setName(appUser.name);
    }
    if (appUser.surname && surname === null) {
        setSurname(appUser.surname);
    }
    if (appUser.bio && bio === null) {
        setBio(appUser.bio);
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

            if (checkValue(name) && checkValue(surname)) {
                FirebaseUtils.insertPersonalInformation(name, surname, bio)
                if (title === "Create profile") {
                    FirebaseUtils.setDefaultValue();
                    navigation.navigate("HomeTemplate");
                } else {
                    navigation.navigate("Profile");
                }
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
            <Text style={styles.title3}>{title}</Text>
            <View style={styles.container}>
                <View>
                    <View style={styles.rowContainer}>
                        <View ref={imageRef} collapsable={false}>
                            <GNProfileImage
                                placeholder={placeholder}
                                size={size}
                                selectedImage={selectedImage} />
                        </View>
                        <GNButton
                            title={"Edit"}
                            width={'50%'}
                            onPress={pickImageAsync}
                            style={{ marginLeft: 10 }} />
                    </View>
                    <GNTextInput
                        placeholder={"Name"}
                        onChangeText={handleInputChangeName}
                        defaultValue={appUser.name} />
                    <GNTextInput
                        placeholder={"Surname"}
                        onChangeText={handleInputChangeSurname}
                        defaultValue={appUser.surname} />

                    <GNTextInputMultiLine
                        placeholder={"Description..."}
                        onChangeText={handleInputChangeBio}
                        height={90}
                        defaultValue={appUser.bio}
                    />
                    <GNButton
                        title={"Save"}
                        onPress={onSaveProfileAsync}
                    />
                </View>
            </View>
        </View >
    );
}