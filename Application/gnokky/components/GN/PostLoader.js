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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState, useEffect } from 'react';
import PostUtils from '../Models/PostUtils';
import { RefreshControl } from 'react-native';
import Divider from './Divider';
import { ActivityIndicator } from 'react-native';

export default function PostLoader({ username, refresh }) {
    appUser.getValueAndUpdate();



    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Stato di caricamento iniziale
    const [visiblePosts, setVisiblePosts] = useState(5);
    const [myPost, setMyPost] = useState(null);

    // let visiblePostsData = [];

    // if (posts && posts.length > 0) {
    //   visiblePostsData = posts.slice(0, visiblePosts);
    // }

    const onRefresh = async () => {
        try {
            const fetchedPosts = await PostUtils.getPostsByUser(username);
            setPosts(fetchedPosts);
            setVisiblePosts(5); // Ripristina il numero di post visualizzati a 5
        } catch (error) {
            console.log(error);
        }
    };

    // const handleScrollEnd = () => {
    //   const totalPosts = posts.length;
    //   const visiblePostsCount = visiblePosts + 5;

    //   if (visiblePostsCount <= totalPosts) {
    //     setVisiblePosts(visiblePostsCount);
    //   }
    // };


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await PostUtils.getPostsByUser(username);
                setPosts(fetchedPosts);
                setLoading(false); // Imposta lo stato di caricamento su false quando i dati sono stati caricati
            } catch (error) {
                console.log(error);
                setLoading(false); // Gestisci l'errore e imposta lo stato di caricamento su false
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (refresh) {
            onRefresh();
        }
    }, [refresh])

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
        warningBody: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
        },
    });

    // Restituisci un messaggio di caricamento durante il caricamento dei dati
    if (loading) {
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                onScrollEndDrag={() => { }}>
                <View style={styles.body}>
                    <ActivityIndicator size="large" color={COLORS.elements} />
                </View>
            </ScrollView>
        );
    }

    // Restituisci i dati solo quando sono completamente caricati
    if (posts && posts.length > 0) {
        const generateComponents = posts.map((post) => (
            <Post
                post={post}
                key={post.id}
            />
        ));

        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.body}>
                    <>{generateComponents}</>
                </View>
            </ScrollView>
        );
    }

    // Se non ci sono post, mostra un messaggio appropriato
    return (
        <ScrollView
            contentContainerStyle={styles.contentContainer}
            onScrollEndDrag={() => { }}>
            <View style={styles.warningBody}>
                <Text>No posts found, try to refresh!</Text>
            </View>
        </ScrollView>
    );
}