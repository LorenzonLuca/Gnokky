import {
    View, Text, StyleSheet, Image, TouchableWithoutFeedback,
    ImageBackground, TouchableOpacity, Modal, Dimensions, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { appUser, COLORS } from "../Models/Globals";
import { useState } from 'react';
import StoriesUtils from '../Models/StoriesUtils';
import { useEffect } from 'react';
import GNProfileImage from './GNProfileImage';
import Divider from './Divider';

export default function StoriesVisualizer({ stories, closeStories, startIndex = 0, property, viewAction }) {
    const [storyIndex, setStoryIndex] = useState(0);
    const [userIndex, setUserIndex] = useState(startIndex);
    const [openUsersModal, setOpenUsersModal] = useState(false);

    const size = 45;
    const windowHeight = Dimensions.get('window').height;
    const modalMaxHeight = windowHeight * 0.7;

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
        modalContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        modalContent: {
            maxHeight: modalMaxHeight,
            width: '100%',
            backgroundColor: 'white',
            borderColor: COLORS.firtText,
            borderWidth: 1,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            padding: 16,
        },
        buttonWatchUsers: {
            margin: 5
        }
    });

    useEffect(() => {
        if (!property) {
            StoriesUtils.viewedStory(stories[userIndex][storyIndex].id, appUser.username)
        }
    }, [userIndex, storyIndex])

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

    const StoryViewer = () => {
        if (property) {
            if (stories[storyIndex].watchedBy.length > 0) {
                return stories[storyIndex].watchedBy.map((user) => (
                    <View key={user.username}>
                        <View style={styles.userView}>
                            <GNProfileImage selectedImage={user.profilePic} size={40} />
                            <Text style={{ marginHorizontal: 4 }}>{user.username}</Text>
                        </View>
                        <Divider />
                    </View>
                ))
            }
        }
    }

    return (
        <>
            <View style={styles.header}>
                <View style={styles.storyIcon}>
                    <Image
                        source={{ uri: !property ? stories[userIndex][0].profilePic : stories[0].profilePic }}
                        style={styles.mediaIcon}
                    />
                </View>
                <Text>{!property ? stories[userIndex][0].owner : "Your story"}</Text>
                <View style={styles.iconContainer}>
                    <TouchableWithoutFeedback onPress={closeStories}>
                        <Ionicons name='close-outline' size={40} />
                    </TouchableWithoutFeedback>
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
                {(property && viewAction) && (
                    <>
                        <View style={styles.propertyActionMenu}>
                            <TouchableWithoutFeedback onPress={() => setOpenUsersModal(true)} style={styles.buttonWatchUsers}>
                                <Text style={styles.buttonWatchUsers}>Watch users</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <Modal
                            visible={openUsersModal}
                            animationType='slide'
                            transparent={true}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <ScrollView>
                                        <View style={styles.header}>
                                            <Text>Users who whatched your story</Text>
                                            <View style={styles.iconContainer}>
                                                <TouchableWithoutFeedback onPress={() => setOpenUsersModal(false)}>
                                                    <Ionicons name='close-outline' size={30} />
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                        <StoryViewer />
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </>
                )}
            </View>
        </>
    );
}