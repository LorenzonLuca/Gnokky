import * as Location from 'expo-location';
import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../../private.conf';
import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion, orderBy } from "firebase/firestore";
import { db } from "./Firebase"
import { storage } from './Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { appUser, updateUser } from './Globals';
import FirebaseUtils from './FirebaseUtils';
import moment from 'moment';

export default class HomeFeedUtils {

    

    static async getPostsByUser(username) {
        try {
            const postsCollection = collection(db, "posts");
            const querySnapshot = await getDocs(query(postsCollection, where('owner', '==', username), orderBy('timestamp','desc')));

            if (!querySnapshot.empty) {
                const posts = [];
                querySnapshot.forEach((doc) => {
                    const post = doc.data();
                    post.id = doc.id;
                    posts.push(post);
                });
                return posts;
            } else {
                console.log("No posts found by this username " + username);
                return null;
            }
        } catch (e) {
            console.log("Error getting posts: ", e);
            return null;
        }
    }
}