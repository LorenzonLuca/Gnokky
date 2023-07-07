import { View, StyleSheet, ScrollView, TouchableHighlight, Text, Modal } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appUser, COLORS } from '../Models/Globals';
import { Image } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useRef, useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableTextInput from './DraggableTextInput';
import { useKeyboard } from '@react-native-community/hooks'
import StoriesUtils from '../Models/StoriesUtils';
import FirebaseUtils from '../Models/FirebaseUtils';
import { captureRef } from 'react-native-view-shot';
import * as ImagePicker from 'expo-image-picker';
import GNCamera from '../GN/GNCamera';
import { Surface } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import GNMusicSelector from '../GN/GNMusicSelector';
import ColorPicker from './ColorPicker';

export default function NewStoryPage({ onClose }) {
    const { t } = useTranslation();
    const [textInputs, setTextInputs] = useState([]);
    const [openCamera, setOpenCamera] = useState(false);
    const [openMusic, setOpenMusic] = useState(false);
    const [bottomBar, showBottomBar] = useState(true);
    const [colorPicker, setColorPicker] = useState(null);
    const [textEditor, setTextEditor] = useState(null);
    const [counter, setCounter] = useState(0);

    const [changePhoto, setChangePhoto] = useState(false);
    const [changeFont, setChangeFont] = useState(false);

    const [closeDraggable, setCloseDraggable] = useState(null);
    const [indexClosedDraggable, setIndexClosedDraggable] = useState(null);

    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [song, setSong] = useState(null);

    const [backgroundColorPicker, showBackgroundColorPicker] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(COLORS.background);

    const keyboard = useKeyboard()
    const imageRef = useRef();

    useEffect(() => {
        setTextInputs([]);
        setChangePhoto(false)
    }, [media])

    const handleUploadStory = async () => {
        console.log("DIOCANE QUANDO CAZZO SALVA STA FOTO", textInputs);
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
            setSong(null);
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

    const handleAddText = () => {
        showBottomBar(false);
        const newTextInput = (
            <DraggableTextInput
                key={counter}
                setBottomBar={(value) => showBottomBar(value)}
                setColorPicker={(picker) => setColorPicker(picker)}
                setTextEditor={(editor) => setTextEditor(editor)}
                innerKey={counter}
                closeDraggable={(func) => {
                    setCloseDraggable(func);
                }}
                setIndexDraggable={(index) => {
                    setIndexClosedDraggable(index);
                    console.log("Index textInput: ", index);
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
        },
        songTitle: {
            fontSize: 20,
            color: COLORS.firtText,
            textAlign: 'center',
        },
        songArtists: {
            fontSize: 14,
            color: COLORS.secondText,
        }
    });

    const generateArtists = (artists) => {
        return artists.map((artist, index) => {
            if (index < artists.length - 1) {
                return artist.name + ", ";
            } else {
                return artist.name;
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <GNAppBar
                    iconLeading='close-outline'
                    onPressLeading={() => { onClose() }}
                    iconTrailing={((media || song) && bottomBar ? 'checkmark-outline' : 'checkmark-circle-outline')}
                    onPressTrailing={((media || song) && bottomBar ? handleUploadStory : confirmText)}

                />
            </View>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                style={{ height: keyboard.keyboardShown ? 510 - keyboard.keyboardHeight : 510 }}
            >
                {changeFont ? (
                    <>
                        {[textEditor]}
                    </>
                ) : (
                    <>
                        {[colorPicker]}
                    </>
                )}
                <GestureHandlerRootView style={styles.body}>
                    <View style={{ flex: 1, padding: 10 }}>
                        <View ref={imageRef} collapsable={false}>
                            {mediaType === 'image' ? (
                                <Surface>
                                    <Image
                                        source={{ uri: media }}
                                        style={{ height: '100%', borderColor: COLORS.thirdText, borderWidth: 1 }}

                                    />
                                </Surface>
                            ) : (
                                <>
                                    {mediaType === 'song' ? (
                                        <Surface style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                            backgroundColor: backgroundColor,
                                        }}>
                                            <Image
                                                source={{ uri: song.album.images[1].url }}
                                                style={{
                                                    height: song.album.images[1].height,
                                                    width: song.album.images[1].width,
                                                    borderColor: COLORS.thirdText,
                                                    borderWidth: 1
                                                }}
                                            />
                                            <Text style={styles.songTitle}>{song.name}</Text>
                                            <Text style={styles.songArtists}>{generateArtists(song.artists)}</Text>
                                        </Surface>
                                    ) : (
                                        <Surface>
                                            <View style={styles.noImageContianer}>
                                                <Text style={styles.noImageContainer}>{t('select-image')}</Text>
                                            </View>
                                        </Surface>
                                    )}
                                </>
                            )}

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
                {backgroundColorPicker && (
                    <ColorPicker setColor={(color) => {
                        setBackgroundColor(color);
                        console.log(color);
                    }} />
                )}
                <View style={styles.actionBar}>
                    {bottomBar ? (
                        <>
                            {(!media && !song) || changePhoto ? (
                                <>
                                    {changePhoto && (
                                        <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                            onPress={() => {
                                                setChangePhoto(false);
                                                showBackgroundColorPicker(false);
                                            }}
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
                                    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                        onPress={() => setOpenMusic(true)}
                                        style={styles.iconButton}>
                                        <Ionicons name="musical-notes-outline" size={33} color={COLORS.secondText} />
                                    </TouchableHighlight>
                                    {song && (
                                        <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                            onPress={() => showBackgroundColorPicker(!backgroundColorPicker)}
                                            style={styles.iconButton}>
                                            <Ionicons name="color-palette-outline" size={33} color={COLORS.secondText} />
                                        </TouchableHighlight>
                                    )}
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
                            {changeFont ? (
                                <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                    onPress={() => setChangeFont(false)}
                                    style={styles.iconButton}>
                                    <Ionicons name='color-palette-outline' size={33} color={COLORS.secondText} />
                                </TouchableHighlight>

                            ) : (
                                <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                    onPress={() => setChangeFont(true)}
                                    style={styles.iconButton}>
                                    <MaterialCommunityIcons name="format-font-size-increase" size={33} color={COLORS.secondText} />
                                </TouchableHighlight>
                            )}
                            <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.1)"
                                onPress={handleRemoveText}
                                style={styles.iconButton}>
                                <Ionicons name="trash-outline" size={33} color={'#e5383b'} />
                            </TouchableHighlight>
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
                        setSong(null);
                        setMediaType("image")
                        setOpenCamera(false);
                    }}
                />
            </Modal>
            <Modal visible={openMusic} animationType="slide">
                <GNMusicSelector
                    onCancel={() => {
                        setOpenMusic(false);
                    }}
                    onSave={(song) => {
                        setSong(song);
                        setMedia(null);
                        setMediaType("song")
                        setOpenMusic(false);
                    }}
                />
            </Modal>
        </SafeAreaView >

    );
}