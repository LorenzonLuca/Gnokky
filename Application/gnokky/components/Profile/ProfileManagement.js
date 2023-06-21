import { StyleSheet, ScrollView, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GNButton from '../GN/GNButton';
import GNProfileImage from '../GN/GNProfileImage';
import { useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { appUser, COLORS } from '../Models/Globals';
import { storage } from '../Models/Firebase';
import { ref, uploadBytes } from 'firebase/storage';
import GNTextInput from '../GN/GNTextInput';
import FirebaseUtils from '../Models/FirebaseUtils';
import GNTextInputMultiLine from '../GN/GNTextInputMultiLine';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ROUTES } from '../Models/Globals';

export default function ProfileManagement({ navigation, route, title, onSave }) {
    // const { title } = route.params;
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
            saveImageInStorage(localUri);

            if (checkValue(name) && checkValue(surname)) {
                FirebaseUtils.insertPersonalInformation(name, surname, bio)
                if (title === "Create profile") {
                    FirebaseUtils.setDefaultValue();
                    navigation.navigate(ROUTES.HOME);
                } else {
                    onSave();
                }
            }
        } catch (e) {
            console.log("Problem while saving new data for user: " + e);
        }
    };

    const saveImageInStorage = async (imageUri) => {
        try {
            // const response = await fetch(imageUri);
            // const blob = await response.blob();

            // const storageRef = ref(storage, `profilespic/${fileName}`);
            // await uploadBytes(storageRef, blob);
            const path = appUser.username + "/profilepic";
            await FirebaseUtils.uploadImage(imageUri, path);

        } catch (e) {
            console.log("error uploading photo in db: " + e);
        }
    }

    const checkValue = (value) => {
        return (value !== null && value !== "");
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
            paddingVertical: 50,
        },
        headerText: {
            fontSize: 20,
            textAlign: 'center',
            color: COLORS.elements,
            fontSize: 45,
            fontFamily: 'mnst-bold'
        },
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 30,
        },
        body: {
            flex: 1,
            padding: 20,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                <View style={styles.body}>
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
                        minHeight={120}
                        defaultValue={appUser.bio}
                    />
                    <GNButton
                        title={"Save"}
                        onPress={onSaveProfileAsync}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}