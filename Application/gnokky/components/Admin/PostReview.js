import { StyleSheet, Alert, ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { COLORS, ROUTES } from '../Models/Globals';
import 'react-native-gesture-handler';
import Post from '../Post/Post';
import { useEffect, useState } from 'react';
import PostUtils from '../Models/PostUtils';
import { ActivityIndicator } from 'react-native';
import GNProfileImage from '../GN/GNProfileImage';
import GNEmptyText from '../GN/GNEmptyText';
import { Image } from 'react-native-elements';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import Repost from '../Repost/Repost';
import AdminUtils from '../Models/AdminUtils';
import Divider from '../GN/Divider';

export default function PostReview({ reportInfo, refreshReports, onClose }) {
  const [post, setPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const tempPost = await PostUtils.getPostById(reportInfo.postId)
        setPost(tempPost);
      } catch (e) {
        console.log("Unable to load post ", e)
      }
    };

    loadPost();
  }, [])

  const handleMediaClick = () => {
    if (post.mediaType == 'image')
      setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDelete = async (postId, reportId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this report?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            console.log("madonna fucilata ", postId)
            await PostUtils.deletePost(await PostUtils.getPostById(postId));
            await AdminUtils.removeAllReportsById('posts', reportInfo.postId)
            refreshReports();
            onClose();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleIgnore = async (reportId) => {
    Alert.alert(
      'Confirm Ignore',
      'Are you sure you want to ignore this report?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ignore',
          style: 'destructive',
          onPress: async () => {
            await AdminUtils.removeReport('posts', reportId);
            refreshReports();
            onClose();
          },
        },
      ],
      { cancelable: true }
    );
  };


  const styles = StyleSheet.create({
    container: {
      paddingBottom: 100,
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 50,
    },
    body: {
      width: '100%',
      borderWidth: 1,
      borderColor: COLORS.thirdText,
      borderRadius: 15,
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
    userInformationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginBottom: 20,
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 10,
      paddingHorizontal: 25,
      borderRadius: 10,
    },
    ignoreButton: {
      backgroundColor: 'green',
      padding: 10,
      paddingHorizontal: 25,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });


  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start' }}>REPORT INFO:</Text>
        <Divider />
        <Text></Text>
        <View style={{ paddingBottom: 20, alignSelf: 'flex-start' }}>
          <Text>Author: {reportInfo.author}</Text>
          <Text>Reason: {reportInfo.reason}</Text>
          <Text>Report date: {AdminUtils.formatDateToText(reportInfo.timestamp)}</Text>
        </View>
        <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start' }}>REPORTED POST:</Text>
        <Divider />
        <Text></Text>
        {post ? (
          <View style={styles.body}>
            <View style={styles.topPostContainer}>
              <View style={styles.userInformationContainer}>
                <View>
                  <GNProfileImage selectedImage={post.ownerProfilePicUrl} size={35} />
                </View>
                <Text style={[styles.border, styles.username]} numberOfLines={1} ellipsizeMode="tail">{post.owner}</Text>
                <Text style={[styles.border, styles.timestamp]}> ⋅ {PostUtils.formatDate(post.timestamp)}</Text>
              </View>
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
        ) : (
          <ActivityIndicator color={COLORS.elements} size={'large'} />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(reportInfo.postId, reportInfo.id)}>
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ignoreButton} onPress={() => handleIgnore(reportInfo.id)}>
            <Ionicons name="checkmark-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}