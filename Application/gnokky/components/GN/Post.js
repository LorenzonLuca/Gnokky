import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal } from 'react-native';
import GNProfileImage from './GNProfileImage';
import { appUser } from '../Models/Globals';
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
import { TouchableWithoutFeedback } from 'react-native';
import AdminUtils from '../Models/AdminUtils';


export default function Post({ post, refreshAfterDelete }){

    const [modalVisible, setModalVisible] = useState(false);

    const [repost, setRepost] = useState(post);

    ///// bottomSheet modal /////
    const bottomSheetOptionModalRef = useRef(null);

    const handlePresentOptionModal = () =>{
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


    const EmptyText = ({ style, icon = "", text }) => {
        if (!text) {
            return <Text style={{ display: 'none' }}>{text}</Text>;
        }

        return <Text style={style}><Ionicons name={icon} size={15} />{text}</Text>;
    };

    useEffect(() => {
        const fetchRepost =  async () => {
            setRepost(await PostUtils.getPostById(post.repost));
        }
        if(post.repost){
            fetchRepost();
        }
    }, [])

    const handleReportPost = async (post) => {
        await AdminUtils.reportPost(post);
        bottomSheetOptionModalRef.current?.dismiss();
    }

    const handleDeleteMyPost = async (postId) => {
        await PostUtils.deletePost(postId);
        refreshAfterDelete();
        bottomSheetOptionModalRef.current?.dismiss();
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        body: {
            flex: 1,
            flexDirection: 'row',
        },
        infoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        mediaContainer: {
            marginVertical: 5,
            borderRadius: 15,
        },
        username: {
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
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={[styles.border, { padding: 10 }]}>
                    <GNProfileImage selectedImage={post.ownerProfilePicUrl} size={50} />
                </View>
                <View style={[styles.border, { flex: 1, padding: 10 }]}>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.border, styles.username]} numberOfLines={1} ellipsizeMode="tail">{post.owner}</Text>
                        <Text style={[styles.border, styles.timestamp]}> ⋅ {PostUtils.formatDate(post.timestamp)}</Text>
                        <Ionicons  onPress={handlePresentOptionModal} style={[styles.border, styles.options]} name='ellipsis-vertical' size={15} color={COLORS.thirdText}/>
                    </View>
                    <EmptyText style={styles.border} text={post.caption} />
                    <View style={styles.mediaContainer}>
                        <EmptyText style={[styles.border, styles.location]} icon={"location-sharp"} text={post.locationInfo} />
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
                            <Repost repost={repost} postHasMedia={post.downloadUrl} />
                        ) : (
                            <></>
                        )}
                        {/* END REPOST */}
                        <PostInteraction post={post} />
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
                </View>
            </View>
            <GNBottomSheetModal modalRef={bottomSheetOptionModalRef} >
                {appUser.username == post.owner ? (
                    <>
                    <TouchableWithoutFeedback onPress={() => handleDeleteMyPost(post.id)} >
                        <View style={[styles.bottomSheetRow]}>
                            <Ionicons name="trash-outline" size={30} color={'red'} />
                            <Text style={[styles.bottomSheetSubtitle, {color: 'red'}]}>    Delete post</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Divider color={COLORS.thirdText}/>
                    </>
                ) : (
                <>
                    <TouchableWithoutFeedback onPress={() => {console.log("SIUMRIMUOVI")}} >
                        <View style={[styles.bottomSheetRow]}>
                            <Ionicons name="person-remove-outline" size={30} color={COLORS.firtText} />
                            <Text style={styles.bottomSheetSubtitle}>    Stop following</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Divider color={COLORS.thirdText}/>
                    <TouchableWithoutFeedback onPress={() => handleReportPost(post)} >
                        <View style={[styles.bottomSheetRow]}>
                            <Ionicons name="alert-circle-outline" size={30} color={'red'} />
                            <Text style={[styles.bottomSheetSubtitle, {color: 'red'}]}>    Report post</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Divider color={COLORS.thirdText}/> 
                </>
                )}
            </GNBottomSheetModal>
            <Divider color={COLORS.thirdText}/>
        </View>
    );
}