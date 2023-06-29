import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal } from 'react-native';
import GNProfileImage from '../GN/GNProfileImage';
import { appUser } from '../Models/Globals';
import { COLORS } from '../Models/Globals';
import { useEffect, useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native-elements';
import * as VideoPicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import PostUtils from '../Models/PostUtils';
import GNEmptyText from '../GN/GNEmptyText';


export default function Repost({ repost, postHasMedia = false }){
    const [repostModalVisible, setRepostModalVisible] = useState(false);


    const handleRepostMediaClick = () => {
        if (repost.mediaType == 'image')
            setRepostModalVisible(true);
    };


    const closeRepostModal = () => {
        setRepostModalVisible(false);
    };
    // useEffect(() => {
    //     const fetchRepost =  async () => {
    //         setRepost(await PostUtils.getPostById(post.repost));
    //     }
    //     if(post.repost){
    //         console.log("hippo ", post.repost)
    //         fetchRepost();
    //     }
    // }, [])

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
        mediaRowContainer: {
            flexDirection: 'row',
            marginVertical: 5,
            borderRadius: 15,
        }, 
        mediaContainer: {
            marginVertical: 5,
            borderRadius: 15,
        }, 
        mediaRow: {
            width: 65,
            height: 65,
            aspectRatio: 1,
            borderRadius: 15,
            borderColor: COLORS.thirdText,
            borderWidth: 1,
            marginRight: 10,
        },
        media: {
            aspectRatio: 1,
            borderRadius: 15,
            borderColor: COLORS.thirdText,
            marginTop: 10,
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
        <>
        <View style={styles.repostContainer}>
            <View style={[styles.border, { flex: 1, padding: 10 }]}>
                <View style={styles.infoContainer}>
                    <GNProfileImage selectedImage={repost.ownerProfilePicUrl} size={30} />
                    <Text style={[styles.border, styles.repostUsername]} numberOfLines={1} ellipsizeMode="tail">{repost.owner}</Text>
                    <Text style={[styles.border, styles.timestamp]}> ⋅ {PostUtils.formatDate(repost.timestamp)}</Text>
                </View>
                {postHasMedia ? (
                    
                    <View style={styles.mediaRowContainer}>
                        <TouchableOpacity onPress={handleRepostMediaClick}>
                            {repost.downloadUrl && repost.mediaType === 'image' && (
                                <Image
                                    source={{ uri: repost.downloadUrl }}
                                    style={styles.mediaRow}
                                    resizeMode="cover"
                                />
                            )}
                            {repost.downloadUrl && repost.mediaType === 'video' && (
                                <Video
                                    source={{ uri: repost.downloadUrl }}
                                    style={styles.mediaRow}
                                    useNativeControls
                                    resizeMode="contain" />
                            )}
                        </TouchableOpacity>
                        <GNEmptyText style={styles.repostCaption} text={repost.caption} />
                    </View>
                ) : (
                    <View style={styles.mediaContainer}>
                        <GNEmptyText style={styles.repostCaption} text={repost.caption} />
                        <TouchableOpacity onPress={handleRepostMediaClick}>
                            {repost.downloadUrl && repost.mediaType === 'image' && (
                                <Image
                                    source={{ uri: repost.downloadUrl }}
                                    style={styles.media}
                                    resizeMode="cover"
                                />
                            )}
                            {repost.downloadUrl && repost.mediaType === 'video' && (
                                <Video
                                    source={{ uri: repost.downloadUrl }}
                                    style={styles.media}
                                    useNativeControls
                                    resizeMode="contain" />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
        <Modal visible={repostModalVisible} transparent={true} onRequestClose={closeRepostModal}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeRepostModal}>
                    <Ionicons name="ios-arrow-back" size={24} color="white" />
                </TouchableOpacity>
                {repost.mediaType === 'image' ? (
                    <ImageViewer
                        imageUrls={[{ url: repost.downloadUrl }]}
                        enableSwipeDown={true}
                        onCancel={closeRepostModal}
                        renderIndicator={() => null}
                        index={0}
                    />
                ) : (
                    <></>
                )}
            </View>
        </Modal>
        </>
    );
}