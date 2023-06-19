import * as Location from 'expo-location';
import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../../private.conf';
import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion, orderBy } from "firebase/firestore";
import { db } from "../Models/Firebase"
import { storage } from '../Models/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { appUser, updateUser } from '../Models/Globals';
import FirebaseUtils from '../Models/FirebaseUtils';
import moment from 'moment';
import PostUtils from '../Models/PostUtils';

export default class HomeFeedUtils {

    static async getFollowedUsernames(id){
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

    static async fillHomeFeed(id) {
        const users = await this.getFollowedUsernames(id);
        if (!users) {
          console.log("Username array empty or null");
          return null;
        }
        
        const promises = users.map(user => PostUtils.getPostsByUser(user));
      
        try {
          const posts = await Promise.all(promises);
          const flattenedPosts = posts.flat();
      
          const sortedPosts = flattenedPosts.sort((a, b) => {
            const timestampA = a.timestamp;
            const timestampB = b.timestamp;
      
            // Ordine crescente in base al timestamp
            return timestampB - timestampA;
          });
      
          console.log("VO LUGAN A LAVURA", sortedPosts);
          return sortedPosts;
        } catch (error) {
          console.error("Error while getting or pushing posts into array: ", error);
          return null;
        }
    } 
}