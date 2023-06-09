import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Alert, Image, Modal } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import AdminUtils from '../Models/AdminUtils';
import PostUtils from '../Models/PostUtils';
import { COLORS } from '../Models/Globals';
import { Video } from 'expo-av';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GNAppBar from '../GN/GNAppBar';
import PostReview from './PostReview';

const PostReports = () => {

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(true);
  const [reports, setReports] = useState([]);
  const [visible, setVisible] = useState(false);
  const [reportInfo, setReportInfo] = useState('');

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

  const renderReportItem = ({ item }) => {
    return (
      <>
      <TouchableOpacity onPress={() => {
          setReportInfo(item);
          setVisible(true);
        }}
      >
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, {flex: 1}]}>{item.postOwner}</Text>
          <Text style={[styles.tableCell, {flex: 2}]}>{item.reason}</Text>
          <Text style={[styles.tableCell, {flex: 1}]}>{AdminUtils.formatDateToText(item.timestamp)}</Text>
        </View>
      </TouchableOpacity>
      </>
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
            <View style={styles.tableRow}>
              <Text style={[styles.headerCell, {flex: 1}]}>User</Text>
              <Text style={[styles.headerCell, {flex: 2}]}>Reason</Text>
              <Text style={[styles.headerCell, {flex: 1}]}>Date</Text>
            </View>
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
      <Modal visible={visible} animationType='fade'>
        <View style={{flex:1}}>
          <GNAppBar onPressLeading={() => {setVisible(false)}} iconLeading='close-outline'  title={' '} iconTrailing=''/>
          <PostReview reportInfo={reportInfo} refreshReports={() => loadReports()} onClose={() => {setVisible(false)}}/>
        </View>
      </Modal>
    </>
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
    backgroundColor: '#FFFFFF',
    padding: 12,
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
});

export default PostReports;
