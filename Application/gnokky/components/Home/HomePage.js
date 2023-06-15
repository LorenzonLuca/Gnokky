import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';


import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { appUser } from '../../components/Models/Globals';
import { COLORS } from '../../components/Models/Globals';
import Post from '../GN/Post';

import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { db } from "../Models/Firebase"
import { storage } from '../Models/Firebase';
import { updateUser } from "../Models/Globals";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState, useEffect } from 'react';
import PostUtils from '../Models/PostUtils';

export default function HomePage({ navigation }) {
  appUser.getValueAndUpdate();

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    PostUtils.getPostsByUser(appUser.username)
      .then((posts) => {
        setPosts(posts);
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  const messageClick = () => {
    navigation.navigate("Chat")
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
    },
    body: {
      flex: 1,
      padding: 5,
      width: '100%',
    },
  });

  if (posts !== undefined) {
    const generateComponents = posts.map(post => (
      <Post caption={post.caption} locationInfo={post.location} timestamp={PostUtils.formatDate(post.timestamp)} mediaType={post.mediaType} mediaUri={post.downloadUrl} key={post.id}/>
    ));

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <GNAppBar />
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.body}>
            <>{generateComponents}</>
          </View>
        </ScrollView>
      </SafeAreaView>
    );

  } else {
      return (
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <GNAppBar />
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.body}>
            <Text>No posts found</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      );
  }
}