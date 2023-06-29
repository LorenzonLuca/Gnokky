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
import { Surface } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

export default function NewStoryPage({ onClose }) {
    const [textInputs, setTextInputs] = useState([]);
    const [openCamera, setOpenCamera] = useState(false);
    const [bottomBar, showBottomBar] = useState(true);
    const [colorPicker, setColorPicker] = useState(null);
    const [counter, setCounter] = useState(0);

    const [changePhoto, setChangePhoto] = useState(false);
    const [changeFont, setChangeFont] = useState(false);
    const [sliderValue, setSliderValue] = useState(15);
    const [fontSize, updateFontSize] = useState(null);

    const [closeDraggable, setCloseDraggable] = useState(null);
    const [indexClosedDraggable, setIndexClosedDraggable] = useState(null);

    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState(null);

    const keyboard = useKeyboard()
    const imageRef = useRef();

    useEffect(() => {
        setTextInputs([]);
        setChangePhoto(false)
    }, [media])

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

    const selectMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
        });

        if (!result.canceled) {
            setMedia(result.assets[0].uri);
            setMediaType(result.assets[0].type);
            setOpenCamera(false);
        }
    }

    const handleRemoveText = () => {
        const newArray = textInputs.splice(indexClosedDraggable, 1);
        console.log("Diocane eliminati", newArray)
        setTextInputs(newArray);
        closeDraggable();
        setCloseDraggable(null);

    }

    const handleChangeFont = (fontsize) => {
        setSliderValue(fontsize);
        fontSize(fontsize);
    }

    const handleAddText = () => {
        showBottomBar(false);
        const newTextInput = (
            <DraggableTextInput
                key={counter}
                setBottomBar={(value) => showBottomBar(value)}
                setColorPicker={(picker) => setColorPicker(picker)}
                innerKey={counter}
                closeDraggable={(func) => {
                    setCloseDraggable(func);
                }}
                setIndexDraggable={(index) => {
                    setIndexClosedDraggable(index);
                    console.log("Index textInput: ", index);
                }}
                updateFontSize={(func) => {
                    updateFontSize(func);
                }}
            />
        );
        setCounter(counter + 1);
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
        noImageContianer: {
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        },
        noImageContainer: {
            fontSize: 25,
        },
        actionBar: {
            borderColor: COLORS.thirdText,
            backgroundColor: COLORS.background,
            borderWidth: 1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <GNAppBar
                    iconLeading='close-outline'
                    onPressLeading={() => { onClose() }}

                    iconTrailing={media && (bottomBar ? 'checkmark-outline' : 'checkmark-circle-outline')}
                    onPressTrailing={media && (bottomBar ? handleUploadStory : confirmText)}

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
                            <Surface>
                                {mediaType === 'image' ? (
                                    <Image
                                        source={{ uri: media }}
                                        style={{ height: '100%', borderColor: COLORS.thirdText, borderWidth: 1 }}

                                    />
                                ) : (
                                    <View style={styles.noImageContianer}>
                                        <Text style={styles.noImageContainer}>Select an image!</Text>
                                    </View>
                                )}
                            </Surface>
                            {/* {mediaType === 'video' && (
                                <Video
                                    source={{ uri: media }}
                                    style={{ height: '100%', borderRadius: 15, borderColor: COLORS.thirdText, borderWidth: 1 }}
                                    useNativeControls
                                    resizeMode="contain"
                                />
                            )} */}
                            {textInputs}
                        </View>
                    </View>
                </GestureHandlerRootView>
                <View style={styles.actionBar}>
                    {bottomBar ? (
                        <>
                            {!media || changePhoto ? (
                                <>
                                    {changePhoto && (
                                        <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                            onPress={() => setChangePhoto(false)}
                                            style={styles.iconButton}>
                                            <Ionicons name="swap-horizontal-outline" size={33} color={COLORS.secondText} />
                                        </TouchableHighlight>
                                    )}
                                    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                        onPress={selectMedia}
                                        style={styles.iconButton}>
                                        <Ionicons name="image-outline" size={33} color={COLORS.secondText} />
                                    </TouchableHighlight>
                                    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                        onPress={() => setOpenCamera(true)}
                                        style={styles.iconButton}>
                                        <Ionicons name="camera-outline" size={33} color={COLORS.secondText} />
                                    </TouchableHighlight>
                                </>

                            ) : (
                                <>
                                    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                        onPress={() => setChangePhoto(true)}
                                        style={styles.iconButton}>
                                        <Ionicons name='swap-horizontal-outline' size={33} color={COLORS.secondText} />
                                    </TouchableHighlight>
                                    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                        onPress={handleAddText}
                                        style={styles.iconButton}>
                                        <Ionicons name="text-outline" size={33} color={COLORS.secondText} />
                                    </TouchableHighlight>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {!changeFont ? (
                                <>
                                    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                        onPress={() => setChangeFont(true)}
                                        style={styles.iconButton}>
                                        <MaterialCommunityIcons name="format-font-size-increase" size={33} color={COLORS.secondText} />
                                    </TouchableHighlight>
                                    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                        onPress={handleRemoveText}
                                        style={styles.iconButton}>
                                        <Ionicons name="trash-outline" size={33} color={'#e5383b'} />
                                    </TouchableHighlight>
                                </>
                            ) : (
                                <>
                                    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                        onPress={() => setChangeFont(false)}
                                        style={styles.iconButton}>
                                        <Ionicons name='arrow-back-circle-outline' size={33} color={COLORS.secondText} />
                                    </TouchableHighlight>
                                    <Slider
                                        style={{ width: 300, height: 40 }}
                                        minimumValue={6}
                                        maximumValue={50}
                                        value={sliderValue}
                                        onValueChange={handleChangeFont}
                                        minimumTrackTintColor={COLORS.elements}
                                        maximumTrackTintColor="#000000"
                                        thumbTintColor={COLORS.elements}
                                    />
                                </>
                            )}
                        </>
                    )}
                </View>

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
                />
            </Modal>
        </SafeAreaView >

    );
}