import { View, StyleSheet, ScrollView, TouchableHighlight, Text, Modal } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appUser, COLORS } from '../Models/Globals';
import { Image } from 'react-native-elements';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useRef, useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableTextInput from '../GN/DraggableTextInput';
import { useKeyboard } from '@react-native-community/hooks'
import StoriesUtils from '../Models/StoriesUtils';
import FirebaseUtils from '../Models/FirebaseUtils';
import { captureRef } from 'react-native-view-shot';
import * as ImagePicker from 'expo-image-picker';
import GNCamera from '../GN/GNCamera';

export default function NewStoryPage({ onClose }) {
    const [textInputs, setTextInputs] = useState([]);
    const [openCamera, setOpenCamera] = useState(false);
    const [bottomBar, showBottomBar] = useState(true);
    const [colorPicker, setColorPicker] = useState(null);

    const [closeDraggable, setCloseDraggable] = useState(null);

    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState(null);

    const keyboard = useKeyboard()
    const imageRef = useRef();


    const handleUploadStory = async () => {
        const localUri = await captureRef(imageRef, {
            quality: 1,
        });

        const fileName = `${appUser.username}_story_${Date.now()}`;
        const path = `${appUser.username}/stories/${fileName}`;
        await FirebaseUtils.uploadImage(localUri, path);

        const img = await FirebaseUtils.getImage(path);

        onClose();

        await StoriesUtils.postStory(img)
    }

    const confirmText = () => {
        console.log("Close text modal");
        closeDraggable();
        setCloseDraggable(null);
    }

    const handleAddText = () => {
        showBottomBar(false);
        const newTextInput = (
            <DraggableTextInput
                key={textInputs.length}
                setBottomBar={(value) => showBottomBar(value)}
                setColorPicker={(picker) => setColorPicker(picker)}
                innerKey={textInputs.length}
                closeDraggable={(func) => {
                    setCloseDraggable(func);
                }}
            />
        );
        setTextInputs([...textInputs, newTextInput]);
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
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <GNAppBar
                    iconLeading='close-outline'
                    onPressLeading={() => { onClose() }}

                    iconTrailing={bottomBar ? 'checkmark-outline' : 'checkmark-circle-outline'}
                    onPressTrailing={bottomBar ? handleUploadStory : confirmText}

                />
            </View>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                style={{ height: keyboard.keyboardShown ? 510 - keyboard.keyboardHeight : 510 }}
            >
                {[colorPicker]}
                <GestureHandlerRootView style={styles.body}>
                    <View style={{ flex: 1, padding: 10 }}>
                        <View ref={imageRef} collapsable={false}>
                            {mediaType === 'image' && (
                                <Image
                                    source={{ uri: media }}
                                    style={{ height: '100%', borderColor: COLORS.thirdText, borderWidth: 1 }}

                                />
                            )}
                            {mediaType === 'video' && (
                                <Video
                                    source={{ uri: media }}
                                    style={{ height: '100%', borderRadius: 15, borderColor: COLORS.thirdText, borderWidth: 1 }}
                                    useNativeControls
                                    resizeMode="contain"
                                />
                            )}
                            {textInputs}
                        </View>
                    </View>
                </GestureHandlerRootView>
                {bottomBar &&
                    <View style={{
                        borderColor: 'black',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 50,
                        display: bottomBar ? "flex" : "none",
                    }}>
                        <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)" onPress={() => setOpenCamera(true)} style={styles.iconButton}>
                            <Ionicons name="camera-outline" size={33} color="black" />
                        </TouchableHighlight>
                        {media && (
                            <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)" onPress={handleAddText} style={styles.iconButton}>
                                <Ionicons name="text-outline" size={33} color="black" />
                            </TouchableHighlight>
                        )}
                    </View>
                }
            </ScrollView>
            <Modal visible={openCamera} animationType="slide">
                <GNCamera
                    onCancel={() => {
                        setOpenCamera(false);

                    }}
                    onSave={(media) => {
                        setMedia(media.uri);
                        setMediaType("image")
                        setOpenCamera(false);
                    }}
                    onOpen={async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            quality: 1,
                        });

                        if (!result.canceled) {
                            setMedia(result.assets[0].uri);
                            setMediaType(result.assets[0].type);
                            setOpenCamera(false);
                        }
                    }}
                    displayOpenGallery={true} />
            </Modal>
        </SafeAreaView >

    );
}