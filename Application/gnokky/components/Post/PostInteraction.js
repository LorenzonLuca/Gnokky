import React, {memo} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { COLORS, appUser } from '../Models/Globals';
import { useEffect, useRef, useRoute } from 'react';
import PostUtils from '../Models/PostUtils';
import CommentSection from './CommentSection';
import RepostPage from '../Repost/RepostPage';
import { Modal } from 'react-native';
import GNBottomSheetModal from './../GN/GNBottomSheetModal';
import ContactList from './../GN/ContactList';
import ChatUtils from '../Models/ChatUtils';
import NotificationUtils from '../Models/NotificationUtils';


function PostInteractions({ post }) {
    const [modalVisible, setModalVisible] = useState(false);

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);

    const bottomSheetCommentsModalRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setLiked(await PostUtils.checkIfLiked(post.id));
            setLikesCount(await PostUtils.getLikeCount(post.id));
            setCommentsCount(await PostUtils.getCommentsCount(post.id));
        }
        fetchData();
    }, [])

    const handlePresentCommentsModal = () => {
        bottomSheetCommentsModalRef.current?.present();
    }

    const shareBottomSheetModalRef = useRef(null);

    const handlePresentModalShare = () => {
        shareBottomSheetModalRef.current?.present();
    }

    const handleDismissModalShare = () => {
        shareBottomSheetModalRef.current?.dismiss();
    }

    const handleLikePost = async () => {
        setLiked(!liked);
        if (liked) {
            setLikesCount(likesCount-1)
            await PostUtils.dislikePost(post.id);
        } else {
            setLikesCount(likesCount+1)
            await PostUtils.likePost(post.id);
            NotificationUtils.insertNotificationPost(post.id, "like", post.owner);
        }
    }

    const handleComments = () => {
        handlePresentCommentsModal();
    }

    const handleSendPost = async (username) => {
        const chat = await ChatUtils.findChatByUsername(username);

        await ChatUtils.sendPost(chat, post.id);
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
        },
        interaction: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        interactionIcon: {
            color: '#63666A',
        },
        interactionCount: {
            marginLeft: 5,
            fontSize: 16,
            color: COLORS.secondText,
        },
        border: {
            //borderWidth: 1,
        },
        shareBottomSheet: {
            flexDirection: 'row',
            alignItems: 'center',
        }
    });

    return (
        <View style={[styles.container, styles.border]}>
            <Modal visible={modalVisible} animationType="slide">
                <RepostPage post={post} onClose={() => setModalVisible(false)} />
            </Modal>
            <View style={styles.interaction}>
                <Ionicons
                    name={liked ? 'heart' : 'heart-outline'}
                    color={liked ? 'red' : '#63666A'}
                    onPress={handleLikePost}
                    size={24}
                />
                <Text style={styles.interactionCount}>{likesCount}</Text>
            </View>
            <View style={styles.interaction}>
                <Ionicons
                    style={styles.interactionIcon}
                    name='chatbox-outline'
                    onPress={handleComments}
                    size={24}
                />
                <Text style={styles.interactionCount}>{commentsCount}</Text>
            </View>
            <View style={styles.interaction}>
                <Ionicons
                    style={styles.interactionIcon}
                    name='sync-outline'
                    onPress={() => setModalVisible(true)}
                    size={24}
                />
            </View>
            <View style={styles.interaction}>
                <Ionicons
                    style={styles.interactionIcon}
                    name='paper-plane-outline'
                    onPress={() => { handlePresentModalShare(); }}
                    size={24}
                />
            </View>
            <GNBottomSheetModal modalRef={shareBottomSheetModalRef} height={['50%']} title={"Share post with someone"}>
                <View style={[styles.shareBottomSheet, { width: '100%' }]}>
                    <ScrollView>
                        <ContactList
                            usernames={appUser.following}
                            iconName={'paper-plane'}
                            contactOnPress={(username) => {
                                console.log("Sending this post to ", username);
                                handleSendPost(username)
                                handleDismissModalShare();
                            }}
                            clickOpenProfile={false}
                            size={50}
                            backgroundColor={COLORS.fourthText}
                        />
                    </ScrollView>
                </View>
            </GNBottomSheetModal>
            <CommentSection
                postId={post.id}
                modalRef={bottomSheetCommentsModalRef}
                title='Comments'
                height='90%'
                postOwner={post.owner}
                updateCommentsCount={() => setCommentsCount(commentsCount+1)}
            />
        </View>
    );
}

export default PostInteractions;