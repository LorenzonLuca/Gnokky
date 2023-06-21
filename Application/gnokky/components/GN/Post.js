import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal } from 'react-native';
import GNProfileImage from './GNProfileImage';
import { appUser } from '../Models/Globals';
import { COLORS } from '../Models/Globals';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native-elements';
import * as VideoPicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import PostInteraction from './PostInteraction';
import Divider from './Divider';
import PostUtils from '../Models/PostUtils';


//export default function Post({username, profilePicUrl, caption = "", locationInfo = "", timestamp, mediaUri = null, mediaType = null}){
export default function Post({ post }) {

    const [modalVisible, setModalVisible] = useState(false);

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
            //   borderColor: 'red',
            //   borderWidth: 1,
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
        location: {
            paddingVertical: 5,
        },
        media: {
            // height: '100%',
            // aspectRatio: 3/4,
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
                    </View>
                    <EmptyText style={styles.border} text={post.caption} />
                    <View style={styles.mediaContainer}>
                        <EmptyText style={[styles.border, styles.location]} icon={"location-sharp"} text={post.locationInfo} />
                        {/* {mediaUri && mediaType === 'image' && (
                                <Image 
                                    source={{ uri: mediaUri }} 
                                    style={styles.media} 
                                    // resizeMode="cover"
                                    resizeMode="cover"
                                />
                            )}
                            {mediaUri && mediaType === 'video' && (
                                <Video
                                    source={{ uri: mediaUri }}
                                    style={styles.media}
                                    useNativeControls
                                    resizeMode="contain" />
                            )} */}
                        <TouchableOpacity onPress={handleMediaClick}>
                            {post.downloadUrl && post.mediaType === 'image' && (
                                <Image
                                    source={{ uri: post.downloadUrl }}
                                    style={styles.media}
                                    // resizeMode="cover"
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
                        <PostInteraction id={post.id} />
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
            <Divider color={COLORS.thirdText} />
        </View>
    );
}