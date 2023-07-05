import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Alert, Image } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import AdminUtils from '../Models/AdminUtils';
import PostUtils from '../Models/PostUtils';
import { COLORS } from '../Models/Globals';
import { Video } from 'expo-av';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';

const PostReports = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [reports, setReports] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);


  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const fetchedReports = await AdminUtils.getReports("posts");
      setReports(fetchedReports);
      setRefreshing(false);
    } catch (error) {
      console.error('Error retrieving reports:', error);
    }
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
            await PostUtils.deletePost(await PostUtils.getPostById(postId));
            await AdminUtils.removeReport('posts',reportId);
            loadReports(); // Update the list after deletion
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
            await AdminUtils.removeReport('posts',reportId);
            loadReports(); // Update the list after ignoring
          },
        },
      ],
      { cancelable: true}
    );
  };

  const renderReportItem = ({ item }) => {
    const isExpanded = item.id === expandedItemId;
  
    return (
      <ListItem bottomDivider onPress={() => setExpandedItemId(isExpanded ? null : item.id)}>
        <ListItem.Content>
          <ListItem.Title>
            Caption: 
            <Text style={{fontWeight: 'bold'}}> {item.postCaption}  </Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            Post author: 
            <Text style={{fontWeight: 'bold'}}> {item.postOwner}  </Text>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            Report date: 
            <Text style={{fontWeight: 'bold'}}> {AdminUtils.formatDateToText(item.timestamp)}  </Text>
          </ListItem.Subtitle>
            {isExpanded && (
              <>
              {item.mediaUrl && item.mediaType === 'image' && (
                  <Image
                    source={{ uri: item.mediaUrl }}
                    style={styles.media}
                    resizeMode="cover"/>
              )}
              {item.mediaUrl && item.mediaType === 'video' && (
                  <Video
                    source={{ uri: item.mediaUrl }}
                    style={styles.media}
                    useNativeControls
                    resizeMode="contain" />
              )}
              </>
            )}
        </ListItem.Content>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => handleDelete(item.postId, item.id)}>
            <Icon name="delete" type="material" color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleIgnore(item.id)}>
            <Icon name="check" type="material" color="green" />
          </TouchableOpacity>
        </View>
      </ListItem>
    );

  };
  

  return (
    <>
      {reports.length === 0 ? (
        <ScrollView 
          contentContainerStyle={styles.containerCenter}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadReports} />
        }>
          <Text>No reports found!</Text>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={reports}
            keyExtractor={(item) => item.id}
            renderItem={renderReportItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={loadReports} />
            }
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
});

export default PostReports;
