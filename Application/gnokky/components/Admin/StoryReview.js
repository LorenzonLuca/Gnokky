import { StyleSheet, Alert, ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, Modal } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { COLORS, ROUTES } from '../Models/Globals';
import 'react-native-gesture-handler';
import Post from '../Post/Post';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import GNProfileImage from '../GN/GNProfileImage';
import GNEmptyText from '../GN/GNEmptyText';
import { Image } from 'react-native-elements';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import AdminUtils from '../Models/AdminUtils';
import Divider from '../GN/Divider';
import StoriesUtils from '../Models/StoriesUtils';

export default function StoryReview({ reportInfo, refreshReports, onClose }) {
  const [story, setStory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        console.log("succhiamiilcal ", reportInfo.storyId)
        const tempStory = await StoriesUtils.getStoryById(reportInfo.storyId)
        setStory(tempStory);
        console.log("Leccamiloscroto ", tempStory)
      } catch (e) {
        console.log("Unable to load post ", e)
      }
    };

    loadPost();
  }, [])

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDelete = async (story, reportId) => {
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
            await StoriesUtils.removeStory(story);
            //await AdminUtils.removeReport('stories',reportId);
            await AdminUtils.removeAllReportsById('stories', reportInfo.storyId)
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
            await AdminUtils.removeReport('stories', reportId);
            refreshReports();
            onClose();
          },
        },
      ],
      { cancelable: true }
    );
  };


  const styles = StyleSheet.create({
    containerCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    media: {
      width: '100%',
      aspectRatio: 1,
      marginTop: 10,
      borderRadius: 15,
      borderColor: COLORS.thirdText,
      borderWidth: 1,
    },
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      padding: 12,
    },
    contentContainer: {
      marginTop: 15,
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 50,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#DDDDDD',
      paddingVertical: 12,
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 16,
      color: '#333333',
    },
    tableCell: {
      flex: 1,
      fontSize: 14,
      color: '#555555',
      paddingHorizontal: 5,
    },
    media: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      flex: 1,
      resizeMode: 'cover',
    },
    storyImg: {
      borderWidth: 1,
      borderColor: COLORS.secondText,
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
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
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
  });


  return (
    <>
      <View style={styles.contentContainer}>
        <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start' }}>REPORT INFO:</Text>
        <Divider />
        <Text></Text>
        <View style={{ paddingBottom: 20, alignSelf: 'flex-start' }}>
          <Text>Author: {reportInfo.author}</Text>
          <Text>Reason: {reportInfo.reason}</Text>
          <Text>Report date: {AdminUtils.formatDateToText(reportInfo.timestamp)}</Text>
        </View>
        <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start' }}>REPORTED STORY:</Text>
        <Divider />
        <Text></Text>
        {story ? (
          <View style={styles.storyImg}>
            <ImageBackground
              source={{ uri: story.img }}
              style={styles.media}
              onLoad={handleImageLoad}
            >
              {isLoading && (
                <ActivityIndicator size="large" color={COLORS.elements} />
              )}
            </ImageBackground>
          </View>
        ) : (
          <ActivityIndicator color={COLORS.elements} size={'large'} />
        )}
        <Text></Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(story, reportInfo.id)}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
        {console.log("madonna lapide ", reportInfo.id)}
        <TouchableOpacity style={styles.ignoreButton} onPress={() => handleIgnore(reportInfo.id)}>
          <Ionicons name="checkmark-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}