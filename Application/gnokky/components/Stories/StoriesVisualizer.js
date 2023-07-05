import {
    View, Text, StyleSheet, Image, TouchableWithoutFeedback,
    ImageBackground, TouchableOpacity, ScrollView, TextInput
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { appUser, COLORS } from "../Models/Globals";
import { useState, useRef, useEffect } from 'react';
import StoriesUtils from '../Models/StoriesUtils';
import GNProfileImage from '../GN/GNProfileImage';
import GNButton from '../GN/GNButton'
import Divider from '../GN/Divider';
import GNBottomSheetModal from '../GN/GNBottomSheetModal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ChatUtils from '../Models/ChatUtils';
import ContactList from '../GN/ContactList';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';

export default function StoriesVisualizer({ stories, closeStories, startIndex = 0, property, viewAction, refreshAllStories }) {
    const { t } = useTranslation();
    const [storyIndex, setStoryIndex] = useState(0);
    const [userIndex, setUserIndex] = useState(startIndex);
    const [hideSomeAction, setHideSomeAction] = useState(true);
    const [answer, setAnswer] = useState('');
    const [color, toggleColor] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isTextInputValid = answer.trim().length === 0;

    const bottomSheetModalRef = useRef(null);

    const handlePresentModal = () => {
        console.log("crepa");
        bottomSheetModalRef.current?.present();
    }

    const watchUserBottomSheetModalRef = useRef(null);

    const handlePresentModalUser = () => {
        watchUserBottomSheetModalRef.current?.present();
    }

    const sendStoryBottomSheetModalRef = useRef(null);

    const handlePresentModalSend = () => {
        sendStoryBottomSheetModalRef.current?.present();
    }


    const size = 45;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        contentContainer: {
            flexGrow: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: 3
        },
        body: {
            flex: 1,
            width: '100%',
        },
        storyIcon: {
            width: size,
            height: size,
            borderRadius: size / 2,
            marginHorizontal: 6
        },
        mediaIcon: {
            width: '100%',
            aspectRatio: 1,
        },
        media: {
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            flex: 1,
            resizeMode: 'cover'
        },
        iconContainer: {
            flex: 1,
            alignItems: 'flex-end'
        },
        storyImg: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            height: '100%',
            padding: 1
        },
        buttonContainer: {
            flexDirection: 'row',
        },
        button: {
            opacity: 0,
            flex: 1,
        },
        propertyActionMenu: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            borderColor: COLORS.firtText,
            borderWidth: 1,
        },
        userView: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: 5
        },
        buttonWatchUsers: {
            margin: 5
        },
        removeStoryLabel: {
            color: 'red',
            fontSize: 20,
        },
        actionStories: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',

        },
        iconsAction: {
            marginHorizontal: 5,
        },
        answerInputContainer: {
            height: 65,
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: '#CCCCCC',
            paddingVertical: 8,
        },
        answerInput: {
            flex: 1,
            marginRight: 8,
            borderWidth: 1,
            borderColor: '#CCCCCC',
            borderRadius: 15,
            padding: 8,
            height: '100%',
        },
    });

    useEffect(() => {
        if (!property) {
            StoriesUtils.viewedStory(stories[userIndex][storyIndex].id, appUser.username)
            if (stories[userIndex][storyIndex].likes.includes(appUser.username)) {
                toggleColor(true);
            }
        }
    }, [userIndex, storyIndex])

    useEffect(() => {
        if (!property) {
            if (color) {
                StoriesUtils.likeAStory(stories[userIndex][storyIndex].id);
            } else {
                StoriesUtils.removeLikeAStory(stories[userIndex][storyIndex].id);
            }
        }
    }, [color])

    const handleNextStory = () => {
        console.log("NEXTTTT");
        setIsLoading(true);
        if (storyIndex < (!property ? stories[userIndex].length - 1 : stories.length - 1)) {
            setStoryIndex(storyIndex + 1);
        } else if (userIndex < stories.length - 1 && !property) {
            setUserIndex(userIndex + 1);
            setStoryIndex(0);
        } else {
            closeStories();
            return;
        }
    }

    const handlePrevoiusStory = () => {
        console.log("PREVIOUSSSSS");
        setIsLoading(true);
        if (storyIndex > 0) {
            setStoryIndex(storyIndex - 1);
        } else if (userIndex > 0 && !property) {
            setUserIndex(userIndex - 1);
            setStoryIndex(stories[userIndex - 1].length - 1);
        }
    }

    const handleAnswer = (text) => {
        setAnswer(text);
    }

    const handleSendAnswer = async () => {
        if (!property) {
            const chat = await ChatUtils.findChatByUsername(stories[userIndex][storyIndex].owner);

            await ChatUtils.sendStory(chat, stories[userIndex][storyIndex], answer);
            setAnswer("");
        }
    }

    const handleSendStory = async (user) => {
        if (!property) {
            const chat = await ChatUtils.findChatByUsername(user);

            await ChatUtils.sendStory(chat, stories[userIndex][storyIndex]);
        }
    }

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const removeStory = () => {
        console.log("Remove story", !property ? stories[userIndex][storyIndex] : stories[storyIndex]);
        StoriesUtils.removeStory(!property ? stories[userIndex][storyIndex] : stories[storyIndex]);
        refreshAllStories();
        closeStories();
    }

    return (
        <BottomSheetModalProvider>
            <View style={styles.header}>
                <View style={styles.storyIcon}>
                    <Image
                        source={{ uri: !property ? stories[userIndex][0].profilePic : stories[0].profilePic }}
                        style={styles.mediaIcon}
                    />
                </View>
                <Text>{!property ? stories[userIndex][0].owner : t('your-story')}</Text>
                <View style={styles.iconContainer}>
                    <View style={styles.header}>
                        {property && (
                            <TouchableWithoutFeedback onPress={handlePresentModal}>
                                <Ionicons name='ellipsis-vertical' size={25} />
                            </TouchableWithoutFeedback>
                        )}
                        <TouchableWithoutFeedback onPress={closeStories}>
                            <Ionicons name='close-outline' size={40} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.storyImg}>
                    <ImageBackground
                        source={{ uri: !property ? stories[userIndex][storyIndex].img : stories[storyIndex].img }}
                        style={styles.media}
                        onLoad={handleImageLoad}
                    >
                        <TouchableOpacity style={styles.button} onPress={handlePrevoiusStory} activeOpacity={1} />
                        {isLoading && (
                            <ActivityIndicator size="large" color={COLORS.elements} />
                        )}
                        <TouchableOpacity style={styles.button} onPress={handleNextStory} activeOpacity={1} />

                    </ImageBackground>
                </View>
                {(property && viewAction) ? (
                    <>
                        <View style={styles.propertyActionMenu}>
                            <TouchableWithoutFeedback onPress={handlePresentModalUser} style={styles.buttonWatchUsers}>
                                <Text style={styles.buttonWatchUsers}>{t('activity')}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <GNBottomSheetModal
                            modalRef={watchUserBottomSheetModalRef}
                            height={'50%'}
                            title={t('watched-story')}
                        >
                            <View style={[styles.header, { width: '100%' }]}>
                                <ScrollView>
                                    <ContactList
                                        usernames={stories[storyIndex].watchedBy}
                                        iconName={'heart'}
                                        iconColor={'#f00'}
                                        size={50}
                                        filterIcon={(username) => {
                                            return stories[storyIndex].likes.includes(username)
                                        }}
                                    />
                                </ScrollView>
                            </View>
                        </GNBottomSheetModal>
                        <GNBottomSheetModal modalRef={bottomSheetModalRef} height={'17%'}>
                            <View style={[styles.header, { width: '100%' }]}>
                                <TouchableWithoutFeedback onPress={removeStory}>
                                    <Text style={styles.removeStoryLabel}>
                                        <Ionicons name='trash-outline' size={25} color={'red'} />{t('delete-story')}
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </GNBottomSheetModal>
                    </>
                ) : (
                    <>
                        <View
                            style={styles.answerInputContainer}
                            onFocus={() => {
                                setHideSomeAction(false);
                            }}
                            onBlur={() => {
                                setHideSomeAction(true);
                            }}
                        >
                            <TextInput
                                style={styles.answerInput}
                                placeholder={t('send-message')}
                                value={answer}
                                onChangeText={handleAnswer}
                            />
                            {hideSomeAction ? (
                                <>
                                    <TouchableWithoutFeedback onPress={handlePresentModalSend}>
                                        <Ionicons name='paper-plane-outline' size={35} style={styles.iconsAction} />
                                    </TouchableWithoutFeedback>
                                    <GNBottomSheetModal
                                        modalRef={sendStoryBottomSheetModalRef}
                                        height={'50%'}
                                        title={"Share with someone"}
                                    >
                                        <View style={[styles.header, { width: '100%' }]}>
                                            <ScrollView>
                                                <ContactList
                                                    usernames={appUser.following}
                                                    iconName={'paper-plane'}
                                                    contactOnPress={(username) => {
                                                        console.log("Sending this story to ", username);
                                                        handleSendStory(username)
                                                    }}
                                                    clickOpenProfile={false}
                                                    size={50}
                                                />
                                            </ScrollView>
                                        </View>
                                    </GNBottomSheetModal>
                                    <TouchableWithoutFeedback onPress={() => {
                                        toggleColor(!color)
                                    }}>
                                        <Ionicons
                                            name={color ? 'heart' : 'heart-outline'}
                                            size={35}
                                            style={styles.iconsAction}
                                            color={color ? '#f00' : '#000'}
                                        />
                                    </TouchableWithoutFeedback>
                                </>
                            ) : (
                                <GNButton
                                    title={t('send')}
                                    backgroundColor={isTextInputValid ? COLORS.thirdText : COLORS.elements}
                                    isDisabled={isTextInputValid}
                                    width={'20%'}
                                    onTouchStart={handleSendAnswer}
                                />
                            )}
                        </View>
                    </>
                )}
            </View>
        </BottomSheetModalProvider>
    );
}