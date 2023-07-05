import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Alert, Image } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import AdminUtils from '../Models/AdminUtils';
import PostUtils from '../Models/PostUtils';
import { COLORS } from '../Models/Globals';
import { Video } from 'expo-av';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';

const UserReports = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [reports, setReports] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);


  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const fetchedReports = await AdminUtils.getReports("users");
      setReports(fetchedReports);
      setRefreshing(false);
    } catch (error) {
      console.error('Error retrieving reports:', error);
    }
  };

  const handleBan = async (userId, reportId) => {
    Alert.alert(
      'Confirm Ban',
      'Are you sure you want to ban this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ban',
          style: 'destructive',
          onPress: async () => {
            console.log("pesce ", userId)
            await AdminUtils.banUser(userId);
            await AdminUtils.removeReport('users',reportId);
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
            await AdminUtils.removeReport('users',reportId);
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
            User: 
            <Text style={{fontWeight: 'bold'}}> {item.user}  </Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            Reporter: 
            <Text style={{fontWeight: 'bold'}}> {item.author}  </Text>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            Report date: 
            <Text style={{fontWeight: 'bold'}}> {AdminUtils.formatDateToText(item.timestamp)}  </Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => handleBan(item.userId, item.id)}>
            <Icon name="block" type="material" color="red" />
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

export default UserReports;
