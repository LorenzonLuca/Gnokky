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
import { FlatList, RefreshControl } from 'react-native';

export default function HomePage({ navigation }) {
  appUser.getValueAndUpdate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Stato di caricamento iniziale
  const [refreshing, setRefreshing] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(5);

  let visiblePostsData = [];

  if (posts && posts.length > 0) {
    visiblePostsData = posts.slice(0, visiblePosts);
  }

  const onRefresh = async () => {
    setRefreshing(true);
  
    try {
      const fetchedPosts = await PostUtils.getPostsByUser(appUser.username);
      setPosts(fetchedPosts);
      setVisiblePosts(5); // Ripristina il numero di post visualizzati a 5
    } catch (error) {
      console.log(error);
    }
  
    setRefreshing(false);
  };
  
  const handleScrollEnd = () => {
    const totalPosts = posts.length;
    const visiblePostsCount = visiblePosts + 5;
  
    if (visiblePostsCount <= totalPosts) {
      setVisiblePosts(visiblePostsCount);
    }
  };
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await PostUtils.getPostsByUser(appUser.username);
        setPosts(fetchedPosts);
        setLoading(false); // Imposta lo stato di caricamento su false quando i dati sono stati caricati
      } catch (error) {
        console.log(error);
        setLoading(false); // Gestisci l'errore e imposta lo stato di caricamento su false
      }
    };

    fetchPosts();
  }, []);

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

  // Restituisci un messaggio di caricamento durante il caricamento dei dati
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <GNAppBar />
        </View>
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
           onScrollEndDrag={handleScrollEnd}>
          <View style={styles.body}>
            <Text>Loading...</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Restituisci i dati solo quando sono completamente caricati
  if (posts && posts.length > 0) {
    const generateComponents = visiblePostsData.map((post) => (
      <Post
        caption={post.caption}
        locationInfo={post.location}
        timestamp={PostUtils.formatDate(post.timestamp)}
        mediaType={post.mediaType}
        mediaUri={post.downloadUrl}
        key={post.id}
      />
    ));
    

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <GNAppBar />
        </View>
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScrollEndDrag={handleScrollEnd}
        >
          <View style={styles.body}>
            <>{generateComponents}</>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Se non ci sono post, mostra un messaggio appropriato
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GNAppBar />
      </View>
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScrollEndDrag={handleScrollEnd}>
        <View style={styles.body}>
          <Text>No posts found</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}