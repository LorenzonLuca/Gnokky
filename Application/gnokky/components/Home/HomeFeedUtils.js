import * as Location from 'expo-location';
import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../../private.conf';
import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion, orderBy } from "firebase/firestore";
import { db } from "../Models/Firebase"
import { storage } from '../Models/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { appUser } from '../Models/Globals';
import FirebaseUtils from '../Models/FirebaseUtils';
import moment from 'moment';
import PostUtils from '../Models/PostUtils';
import StoriesUtils from '../Models/StoriesUtils';

export default class HomeFeedUtils {

    static async getFollowedUsernames(id) {
        try {
            const userDocRef = doc(db, 'users', id);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                const followingArray = userData.following || [];
                return followingArray;
            } else {
                console.log('L\'utente non esiste', id);
            }
        } catch (error) {
            console.log('Errore durante il recupero dell\'array "following":', error);
        }
    }
    // METODO CHE PUZZA DI CULO
    // (username id)
    static async fillHomeFeed(id) {
        const users = await this.getFollowedUsernames(id);
        if (!users) {
            console.log("Username array empty or null");
            return null;
        }

        const promises = users.map(user => PostUtils.getPostsByUser(user, true));

        try {
            const posts = await Promise.all(promises);
            console.log("per me è si ", flattenedPosts);
            const flattenedPosts = posts
                .flat()
                .filter(post => post && post.timestamp !== null && post.timestamp !== undefined);

            if (flattenedPosts.length > 1) {
                const sortedPosts = flattenedPosts.sort((a, b) => {
                    const timestampA = a.timestamp;
                    const timestampB = b.timestamp;

                    if (timestampA && timestampB) {
                        // Ordine crescente in base al timestamp
                        return timestampB - timestampA;
                    } else {
                        return 0;
                    }
                });
                return sortedPosts;
            } else {
                return flattenedPosts;
            }

        } catch (error) {
            console.error("Errore durante il recupero o l'inserimento dei post nell'array: ", error);
            return null;
        }
    }



    // Metodo per le storie
    static async getStoriesByUser(id) {
        const users = await this.getFollowedUsernames(id);
        if (!users) {
            console.log("Username array empty or null");
            return null;
        }

        const promises = users.map(user => StoriesUtils.getStoriesByUsername(user));

        try {
            const stories = await Promise.all(promises);

            const filtered = stories.filter((element) => {
                return element != null && element.length > 0;
            });


            if (filtered.length > 1) {
                const sortedStory = filtered.sort((a, b) => {
                    const timestampA = a.timestamp;
                    const timestampB = b.timestamp;

                    // Ordine crescente in base al timestamp
                    return timestampB - timestampA;
                });

                return sortedStory;
            } else {
                return filtered;
            }
        } catch (error) {
            console.error("Error while getting or pushing stories into array: ", error);
            return null;
        }
    }
}