import {
    View, Text, StyleSheet, Image, TouchableWithoutFeedback,
    ImageBackground, TouchableOpacity, Modal, Dimensions, ScrollView,
    KeyboardAvoidingView, TextInput
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { appUser, COLORS } from "../Models/Globals";
import { useState, useRef, useEffect } from 'react';
import StoriesUtils from '../Models/StoriesUtils';
import GNProfileImage from '../GN/GNProfileImage';
import GNTextInput from '../GN/GNTextInput';
import GNButton from '../GN/GNButton'
import Divider from '../GN/Divider';
import GNBottomSheetModal from '../GN/GNBottomSheetModal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FirebaseUtils from '../Models/FirebaseUtils';
import ChatUtils from '../Models/ChatUtils';
import ContactList from '../GN/ContactList';

export default function StoriesVisualizer({ stories, closeStories, startIndex = 0, property, viewAction, refreshAllStories }) {
    const [storyIndex, setStoryIndex] = useState(0);
    const [userIndex, setUserIndex] = useState(startIndex);
    const [answerWidth, setAnswerWidth] = useState('75%');
    const [hideSomeAction, setHideSomeAction] = useState(true);
    const [answer, setAnswer] = useState('');
    const [color, toggleColor] = useState(false);

    const bottomSheetModalRef = useRef(null);

    const isTextInputValid = answer.trim().length === 0;

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
            // console.log("PORCODDIDIO");
        }
    }

    const handleSendStory = async (user) => {
        if (!property) {
            const chat = await ChatUtils.findChatByUsername(user);

            await ChatUtils.sendStory(chat, stories[userIndex][storyIndex]);
        }
    }

    const StoryViewer = () => {
        if (property) {
            if (stories[storyIndex].watchedBy.length > 0) {
                return stories[storyIndex].watchedBy.map((user) => (
                    <View key={user.username}>
                        {console.log(user)}
                        <View style={styles.userView}>
                            <GNProfileImage selectedImage={user.profilePic} size={40} />
                            <Text style={{ marginHorizontal: 4 }}>{user.username}</Text>
                            {stories[storyIndex].likes.includes(user.username) && (
                                <Ionicons
                                    name={'heart'}
                                    size={20}
                                    color={'#f00'}
                                />
                            )}
                        </View>
                        <Divider />
                    </View>
                ));
            }
        }

        return null; // Handle other cases when property is false or there are no viewers
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
                <Text>{!property ? stories[userIndex][0].owner : "Your story"}</Text>
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
                    >
                        <TouchableOpacity style={styles.button} onPress={handlePrevoiusStory} activeOpacity={1}>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleNextStory} activeOpacity={1}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                {(property && viewAction) ? (
                    <>
                        <View style={styles.propertyActionMenu}>
                            <TouchableWithoutFeedback onPress={handlePresentModalUser} style={styles.buttonWatchUsers}>
                                <Text style={styles.buttonWatchUsers}>Watch users</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <GNBottomSheetModal
                            modalRef={watchUserBottomSheetModalRef}
                            height={'50%'}
                            title={"User who watched your story"}
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
                                        <Ionicons name='trash-outline' size={25} color={'red'} />Remove Story
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
                                setAnswerWidth('80%');
                            }}
                            onBlur={() => {
                                setHideSomeAction(true);
                                setAnswerWidth('75%');
                            }}
                        >
                            <TextInput
                                style={styles.answerInput}
                                placeholder="Write an answer"
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
                                        title={"Send to someone"}
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
                                    title={'SEND'}
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