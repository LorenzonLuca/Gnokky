import { appUser, COLORS } from "../Models/Globals";
import { View, StyleSheet, Text, Image, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useEffect } from "react";
import { useState } from "react";
import StoriesUtils from "../Models/StoriesUtils";
import StoriesVisualizer from "../Stories/StoriesVisualizer";
import { useTranslation } from 'react-i18next';
import PostUtils from "../Models/PostUtils";
import Post from "../GN/Post";
import FirebaseUtils from "../Models/FirebaseUtils";
import GNProfileImage from "../GN/GNProfileImage";
import { useNavigation } from "@react-navigation/native";

export default function Message({ message }) {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const property = message.owner === appUser.username;
    const [propertyStory, setPropertyStory] = useState(null);
    const [story, setStory] = useState(null);
    const [post, setPost] = useState(null);
    const [profile, setProfile] = useState(null);
    const [openStory, setOpenStory] = useState(null)

    useEffect(() => {
        if (message.isStory) {
            const fetchStory = async (id) => {
                try {
                    const newStory = await StoriesUtils.getStoryById(id);
                    console.log("STORIA IN CHAT SIOUMI", newStory);
                    if (newStory !== 'expired') {
                        setPropertyStory(newStory.owner === appUser.username);
                    }
                    setStory(newStory);
                } catch (error) {
                    console.log("Error while trying to get story, ", error)
                }
            }
            console.log("BOIA È STATA INVIATA UNA STORIA");
            fetchStory(message.text)
        } else if (message.isPost) {
            const fetchPost = async (id) => {
                try {
                    const newPost = await PostUtils.getPostById(id);
                    console.log("POST IN CHAT GODODODO: ", newPost);
                    setPost(newPost);
                } catch (error) {
                    console.log("Error while trying to get post: ", error);
                }
            }
            console.log("BOIA È STATO INVIATO UN POST");
            fetchPost(message.text)
        } else if (message.isProfile) {
            const fetchProfile = async (id) => {
                try {
                    const newProfile = await FirebaseUtils.getUser(id);
                    console.log("PROFILE IN CHAT GODODODO: ", newProfile);
                    setProfile(newProfile);
                } catch (error) {
                    console.log("Error while trying to get profile ", error);
                }
            }
            console.log("BOIA È STATO INVIATO UN PROFILO");
            fetchProfile(message.text)
        }
    }, [])

    const handleOpenProfile = async (user) => {

        navigation.navigate("ProfileSearch", { user: user });

    }

    const styles = StyleSheet.create({
        message: {
            maxWidth: '100%',
            padding: 5,
            borderRadius: 20,
            marginVertical: 10,
            alignSelf: property ? 'flex-end' : 'flex-start',
        },
        yourMessage: {
            // alignSelf: 'flex-start',
            backgroundColor: COLORS.elements,
        },
        otherUserMessage: {
            // alignSelf: 'flex-end',
            backgroundColor: COLORS.thirdText,
        },
        messageText: {
            color: property ? COLORS.background : COLORS.firtText,
            padding: 10,
        },
        timeDate: {
            color: property ? COLORS.thirdText : COLORS.firtText,
            paddingHorizontal: 5,
        },
        img: {
            width: 200, // Define the appropriate width for your image
            height: 200, // Define the appropriate height for your image
            borderRadius: 30,
        },
        imgMessage: {
            maxWidth: '100%',
            padding: 5,
            marginTop: 10,
            marginBottom: -10,
            alignSelf: property ? 'flex-end' : 'flex-start',
        },
        messageExpired: {
            maxWidth: '100%',
            padding: 2,
            borderRadius: 20,
            marginVertical: 2,
            alignSelf: property ? 'flex-end' : 'flex-start',
        },
        expiredStory: {
            color: COLORS.secondText,
            padding: 10,
            fontStyle: 'italic',
        },
        profileContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        profileUsername: {
            marginHorizontal: 7,
            fontSize: 20
        }
    })

    const transformDate = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes} ${period}`;
    }

    return (
        <>
            {!message.isStory && !message.isPost && !message.isProfile ? (
                <View style={[styles.message, property ? styles.yourMessage : styles.otherUserMessage]}>
                    <Text style={styles.messageText}>{message.text}</Text>
                    <Text style={styles.timeDate}>{transformDate(message.timestamp)}</Text>
                </View >
            ) : (
                <>
                    {message.isStory && (
                        <>
                            {story ? (
                                <>
                                    {story === 'expired' ? (
                                        <View style={styles.messageExpired}>
                                            <Text style={styles.expiredStory}>{t('story-no-longer-available')}</Text>
                                        </View>
                                    ) : (
                                        <>
                                            <TouchableOpacity style={styles.imgMessage} onPress={() => setOpenStory(true)}>
                                                <Image source={{ uri: story.img }} style={styles.img} />
                                            </TouchableOpacity>
                                            <Modal visible={openStory} animationType={'slide'}>
                                                <StoriesVisualizer
                                                    stories={[story]}
                                                    property={true}
                                                    viewAction={propertyStory}
                                                    closeStories={() => setOpenStory(false)}
                                                />
                                            </Modal>
                                        </>
                                    )}
                                </>
                            ) : (
                                <View style={[styles.message, property ? styles.yourMessage : styles.otherUserMessage]}>
                                    <Text style={styles.messageText}>Loading story</Text>
                                </View>
                            )}

                        </>
                    )}
                    {message.isPost && (
                        <>
                            {post ? (
                                <Post post={post} key={post.id} />
                            ) : (
                                <View style={[styles.message, property ? styles.yourMessage : styles.otherUserMessage]}>
                                    <Text style={styles.messageText}>Loading post</Text>
                                </View>
                            )}

                        </>
                    )}
                    {message.isProfile && (
                        <>
                            {profile ? (
                                <TouchableWithoutFeedback onPress={() => handleOpenProfile(profile)}>
                                    <View style={[
                                        styles.message,
                                        property ? styles.yourMessage : styles.otherUserMessage,
                                        styles.profileContainer
                                    ]}>
                                        <GNProfileImage selectedImage={profile.profilePic} size={60} />
                                        <Text style={[styles.profileUsername, styles.messageText]}>{profile.username}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ) : (
                                <View style={[styles.message, property ? styles.yourMessage : styles.otherUserMessage]}>
                                    <Text style={styles.messageText}>Loading profile</Text>
                                </View>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
}