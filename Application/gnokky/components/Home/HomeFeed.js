import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';


import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { appUser } from '../Models/Globals';
import { COLORS } from '../Models/Globals';
import Post from '../Post/Post';

import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { db } from "../Models/Firebase"
import { storage } from '../Models/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState, useEffect } from 'react';
import PostUtils from '../Models/PostUtils';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';
import HomeFeedUtils from './HomeFeedUtils';
import HomeStories from './HomeStories';
import Divider from '../GN/Divider';
import FirebaseUtils from '../Models/FirebaseUtils';
import FloatingButton from '../GN/FloatingButton';
import { FlatList, Animated } from 'react-native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function HomeFeed({ id }) {

    const [posts, setPosts] = useState([]);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true); // Stato di caricamento iniziale
    const [refreshing, setRefreshing] = useState(false);
    const [visiblePosts, setVisiblePosts] = useState(5);
    const [refreshAftetDeleteStory, setRefreshAftetDeleteStory] = useState(false);
    const [refreshMyStory, setRefreshMyStory] = useState(false);

    // let visiblePostsData = [];

    // if (posts && posts.length > 0) {
    //   visiblePostsData = posts.slice(0, visiblePosts);
    // }

    const onRefresh = async () => {
        setRefreshing(true);
        setRefreshMyStory(true);
        try {
            const fetchedPosts = await HomeFeedUtils.fillHomeFeed(id);
            const fetchedStories = await HomeFeedUtils.getStoriesByUser(id);
            setStories(fetchedStories);
            setPosts(fetchedPosts);
            setVisiblePosts(5); // Ripristina il numero di post visualizzati a 5

            // appUser.getValueAndUpdate();
            FirebaseUtils.updateAppUser();
        } catch (error) {
            console.log(error);
        }
        setRefreshMyStory(false);
        setRefreshing(false);
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
                const fetchedPosts = await HomeFeedUtils.fillHomeFeed(id);
                setPosts(fetchedPosts);
                setLoading(false); // Imposta lo stato di caricamento su false quando i dati sono stati caricati
            } catch (error) {
                console.log(error);
                setLoading(false); // Gestisci l'errore e imposta lo stato di caricamento su false
            }
        };

        const fetchStories = async () => {
            try {
                const fetchedStories = await HomeFeedUtils.getStoriesByUser(id);
                setStories(fetchedStories);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchUser = async () => {
            // await appUser.getValueAndUpdate();
            await FirebaseUtils.updateAppUser();
        }

        fetchUser();
        fetchPosts();
        fetchStories();
    }, []);

    useState(() => {

        const refetch = async () => {
            const fetchedStories = await HomeFeedUtils.getStoriesByUser(id);
            setStories(fetchedStories);
            console.log("STORIES REFETCHED");
            setRefreshAftetDeleteStory(false);
        }

        if (refreshAftetDeleteStory) {
            refetch();
        }
    }, [refreshAftetDeleteStory])

    const handleRefreshStories = () => {
        setRefreshAftetDeleteStory(true);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        contentContainer: {
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
        firstLayer: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            zIndex: 999,
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
    });

    // Floating button disappear
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 80);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 80],
        outputRange: [0, 80],
    });
    //END Floating button disappear


    const [isOverlayVisible, setIsOverlayVisible] = useState(false);


    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
    };

    // Restituisci un messaggio di caricamento durante il caricamento dei dati
    if (loading) {
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
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
            <View key={post.id}>
                <Post
                    post={post}
                    key={post.id}
                />
            </View>
        ));

        // const renderPostItem = ({ item }) => {
        //     return (
        //         <View key={item.id}>
        //             <Post
        //                 post={item}
        //                 key={item.id}
        //             />
        //         </View>
        //     );
        // }


        return (
            <View style={{ height: '100%' }}>
                <Animated.ScrollView
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    onScroll={(e) => {
                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                    }}
                >
                    <Animated.View style={styles.body}>
                        <HomeStories fetchedStories={stories} refreshStories={handleRefreshStories} refreshMyStory={refreshMyStory} />
                        <Divider color={COLORS.thirdText} />
                        <Text></Text>
                        <>{generateComponents}</>
                    </Animated.View>
                </Animated.ScrollView>
                <Animated.View style={[
                    styles.firstLayer, {
                        transform: [
                            { translateY: translateY }
                        ],
                    }]}>
                    <FloatingButton />
                </Animated.View>
            </View>
        );
    }

    // Se non ci sono post, mostra un messaggio appropriato
    // return (
    //     <ScrollView
    //         contentContainerStyle={styles.contentContainer}
    //         refreshControl={
    //             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //         }
    //         onScrollEndDrag={() => { }}>
    //         <View style={styles.body}>
    //             <HomeStories fetchedStories={stories} refreshStories={handleRefreshStories} refreshMyStory={refreshMyStory} />
    //             <Divider />
    //         </View>

    //         <View style={styles.warningBody}>
    //             <Text>No posts found, try to refresh!</Text>
    //         </View>
    //         <Animated.View style={[
    //             styles.firstLayer, {
    //                 transform: [
    //                     { translateY: translateY }
    //                 ],
    //             }]}>
    //             <FloatingButton />
    //         </Animated.View>
    //     </ScrollView>
    // );
    return (
        <View style={{ height: '100%' }}>
            <Animated.ScrollView
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                onScroll={(e) => {
                    scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
            >
                <Animated.View style={styles.body}>
                    <HomeStories fetchedStories={stories} refreshStories={handleRefreshStories} refreshMyStory={refreshMyStory} />
                    <Divider color={COLORS.thirdText} />
                    <View style={styles.warningBody}>
                        <Text>No posts found, try to refresh!</Text>
                    </View>
                </Animated.View>
            </Animated.ScrollView>
            <Animated.View style={[
                styles.firstLayer, {
                    transform: [
                        { translateY: translateY }
                    ],
                }]}>
                <FloatingButton />
            </Animated.View>
        </View>
    );
}