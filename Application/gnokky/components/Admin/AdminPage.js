import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import AdminUtils from '../Models/AdminUtils';
import PostUtils from '../Models/PostUtils';

const AdminPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const fetchedReports = await AdminUtils.getReports();
      setReports(fetchedReports);
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
            await PostUtils.deletePost(postId);
            await AdminUtils.removeReport(reportId);
            fetchReports(); // Update the list after deletion
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
            await AdminUtils.removeReport(reportId);
            fetchReports(); // Update the list after ignoring
          },
        },
      ],
      { cancelable: true}
    );
  };

  const renderReportItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.author}</ListItem.Title>
        <ListItem.Subtitle>{AdminUtils.formatDate(item.timestamp)}</ListItem.Subtitle>
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

  return (
    <>
      {reports.length === 0 ? (
        <View style={styles.containerCenter}>
          <Text>No reports found!</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={reports}
            keyExtractor={(item) => item.id}
            renderItem={renderReportItem}
            // Add other FlatList props if necessary
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
});

export default AdminPage;
