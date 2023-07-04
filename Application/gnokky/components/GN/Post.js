import { StyleSheet, ScrollView, View, Text, TouchableOpacity,TouchableWithoutFeedback, Modal } from 'react-native';
import GNProfileImage from './GNProfileImage';
import { ROUTES, appUser } from '../Models/Globals';
import { COLORS } from '../Models/Globals';
import { useEffect, useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native-elements';
import * as VideoPicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import PostInteraction from './PostInteraction';
import Divider from './Divider';
import PostUtils from '../Models/PostUtils';
import GNBottomSheetModal from './GNBottomSheetModal';
import Repost from '../Repost/Repost';

import 'react-native-gesture-handler';
import AdminUtils from '../Models/AdminUtils';
import { useNavigation } from '@react-navigation/native';
import FirebaseUtils from '../Models/FirebaseUtils';
import { Surface } from 'react-native-paper';
import GNEmptyText from './GNEmptyText';

export default function Post({ post, refreshAfterDelete }) {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);

    const [repost, setRepost] = useState(post);

    ///// bottomSheet modal /////
    const bottomSheetOptionModalRef = useRef(null);

    const handlePresentOptionModal = () => {
        bottomSheetOptionModalRef.current?.present();
    }
    //////////

    const handleMediaClick = () => {
        if (post.mediaType == 'image')
            setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        const fetchRepost = async () => {
            setRepost(await PostUtils.getPostById(post.repost));
        }
        if (post.repost) {
            fetchRepost();
        }
    }, [])

    const handleReportPost = async (post) => {
        await AdminUtils.reportPost(post);
        bottomSheetOptionModalRef.current?.dismiss();
    }

    const handleDeleteMyPost = async (post) => {
        console.log("diobon sto provando ad eliminare ", post);
        await PostUtils.deletePost(post);
        refreshAfterDelete();
        bottomSheetOptionModalRef.current?.dismiss();
    }

    const handleOpenProfile = async () => {
        FirebaseUtils.getUserByUsername(post.owner)
            .then((user) => {
                navigation.navigate("ProfileSearch", { user: user[0] });
            })
            .catch((error) => {
                console.log("Error while getting username ", error)
            })
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
            marginHorizontal: 10,
            marginBottom: 12,
            elevation: 6,
            borderRadius: 16,
        },
        body: {
            flex: 1,
            padding: 10,
        },
        topPostContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        mediaContainer: {
            marginVertical: 5,
            borderRadius: 15,
        },
        username: {
            marginLeft: 7,
            fontWeight: 'bold',
        },
        timestamp: {

        },
        options: {

        },
        location: {
            paddingVertical: 5,
        },
        media: {
            aspectRatio: 1,
            borderRadius: 15,
            borderColor: COLORS.thirdText,
            borderWidth: 1,
            //marginBottom: 10,
        },
        modalContainer: {
            flex: 1,
            backgroundColor: 'black',
        },
        closeButton: {
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 1,
        },
        modalVideo: {
            flex: 1,
        },
        border: {
            // borderColor: 'black',
            // borderWidth: 1,
        },
        bottomSheetSubtitle: {
            fontWeight: "bold",
            color: COLORS.firtText,
            fontSize: 14,
        },
        bottomSheetRow: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-start',
            marginVertical: 5,
        },
        repostContainer: {
            flexDirection: 'row',
            borderRadius: 15,
            borderWidth: 1,
            borderColor: COLORS.thirdText,
        },
        repostMediaContainer: {
            flexDirection: 'row',
            marginVertical: 5,
            borderRadius: 15,
        },
        repostMedia: {
            width: 65,
            height: 65,
            aspectRatio: 1,
            borderRadius: 15,
            borderColor: COLORS.thirdText,
            borderWidth: 1,
            marginRight: 10,
        },
        repostUsername: {
            fontWeight: 'bold',
            marginLeft: 10,
        },
        repostCaption: {
            flex: 1,
        },
        userInformationContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        }
    });

    return (
        <Surface style={styles.container}>
            <View style={styles.body}>
                <View style={styles.topPostContainer}>
                    <TouchableWithoutFeedback onPress={handleOpenProfile}>
                        <View style={styles.userInformationContainer}>
                                <View>
                                    <GNProfileImage selectedImage={post.ownerProfilePicUrl} size={35} />
                                </View>
                            <Text style={[styles.border, styles.username]} numberOfLines={1} ellipsizeMode="tail">{post.owner}</Text>
                            <Text style={[styles.border, styles.timestamp]}> ⋅ {PostUtils.formatDate(post.timestamp)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Ionicons onPress={handlePresentOptionModal} style={styles.options} name='ellipsis-vertical' size={15} color={COLORS.secondText} />
                </View>
                <GNEmptyText style={styles.border} text={post.caption} />
                <View style={styles.mediaContainer}>
                    <GNEmptyText style={[styles.border, styles.location]} icon={"location-sharp"} text={post.locationInfo} />
                    <TouchableOpacity onPress={handleMediaClick}>
                        {post.downloadUrl && post.mediaType === 'image' && (
                            <Image
                                source={{ uri: post.downloadUrl }}
                                style={styles.media}
                                resizeMode="cover"
                            />
                        )}
                        {post.downloadUrl && post.mediaType === 'video' && (
                            <Video
                                source={{ uri: post.downloadUrl }}
                                style={styles.media}
                                useNativeControls
                                resizeMode="contain" />
                        )}
                    </TouchableOpacity>
                    {/* REPOST SECTION */}
                    {post.repost !== "" ? (
                        // <Surface style={{borderRadius: 16}}>
                            <Repost repost={repost} postHasMedia={post.downloadUrl} />
                        // </Surface>
                    ) : (
                        <></>
                    )}
                    {/* END REPOST */}
                    <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Ionicons name="ios-arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                            {post.mediaType === 'image' ? (
                                <ImageViewer
                                    imageUrls={[{ url: post.downloadUrl }]}
                                    enableSwipeDown={true}
                                    onCancel={closeModal}
                                    renderIndicator={() => null}
                                    index={0}
                                />
                            ) : (
                                <></>
                            )}
                        </View>
                    </Modal>
                </View>
                <PostInteraction post={post} />
            </View>
            <GNBottomSheetModal modalRef={bottomSheetOptionModalRef} >
                {appUser.username == post.owner ? (
                    <>
                        <TouchableWithoutFeedback onPress={() => handleDeleteMyPost(post)} >
                            <View style={[styles.bottomSheetRow]}>
                                <Ionicons name="trash-outline" size={30} color={'red'} />
                                <Text style={[styles.bottomSheetSubtitle, { color: 'red' }]}>    Delete post</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <Divider color={COLORS.thirdText} />
                    </>
                ) : (
                    <>
                        <TouchableWithoutFeedback onPress={() => { console.log("SIUMRIMUOVI") }} >
                            <View style={[styles.bottomSheetRow]}>
                                <Ionicons name="person-remove-outline" size={30} color={COLORS.firtText} />
                                <Text style={styles.bottomSheetSubtitle}>    Stop following</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <Divider color={COLORS.thirdText} />
                        <TouchableWithoutFeedback onPress={() => handleReportPost(post)} >
                            <View style={[styles.bottomSheetRow]}>
                                <Ionicons name="alert-circle-outline" size={30} color={'red'} />
                                <Text style={[styles.bottomSheetSubtitle, { color: 'red' }]}>    Report post</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <Divider color={COLORS.thirdText} />
                    </>
                )}
            </GNBottomSheetModal>
        </Surface>
    );
}