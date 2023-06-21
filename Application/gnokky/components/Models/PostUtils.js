import * as Location from 'expo-location';
import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../../private.conf';
import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion,arrayRemove, orderBy} from "firebase/firestore";
import { db } from "./Firebase"
import { storage } from './Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { appUser, updateUser } from './Globals';
import FirebaseUtils from './FirebaseUtils';
import moment from 'moment';

export default class PostUtils {

    /// LOCAITON SECTION ///

    static async getUserLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return "Permission to access location was denied";
        }

        let location = await Location.getCurrentPositionAsync({});
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const city = await this.getCityName(latitude, longitude);
        return city;
    }
    static async getCityName(latitude, longitude) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

        try {
            const response = await axios.get(url);
            if (response.data.features.length > 0) {
                const city = response.data.features[0].place_name;
                return city;
            }
        } catch (error) {
            console.error('Error retrieving city name:', error);
        }

        return null;
    }

    /// MEDIA SECTION ///

    static async insertNewPost(mediaUri, mediaType, caption = "", locationInfo = "",) {
        try {
            let downloadUrl = "";
            if (mediaUri && mediaType) {
                const response = await fetch(mediaUri);
                const blob = await response.blob();

                const fileName = `${appUser.username}_${mediaType}_${Date.now()}`;
                const storageRef = ref(storage, `${appUser.username}/posts/${fileName}`);

                await uploadBytes(storageRef, blob);

                downloadUrl = await getDownloadURL(storageRef);
                console.log(`${mediaType} URL:`, downloadUrl);
            }

            const postDocRef = await addDoc(collection(db, "posts"), {
                owner: appUser.username,
                ownerProfilePicUrl: appUser.profilePic,
                likes: [],
                comments: [],
                repost: 0,
                location: locationInfo,
                caption: caption,
                downloadUrl: downloadUrl,
                mediaType: mediaType,
                timestamp: new Date().getTime(),
            }
            );

            console.log("new post id: " + postDocRef.id);

            const userDocRef = doc(db, "users", appUser.id);

            await updateDoc(userDocRef, {
                posts: arrayUnion(postDocRef.id),
            });

            setTimeout(async () => {
                const tmpUser = await FirebaseUtils.getUser(appUser.id);
                updateUser(tmpUser)
                console.log(appUser.username + "'s post has been uploaded successfully into firebase");
            }, 1000)
        } catch (e) {
            console.log("error uploading new post into firestore/storage " + e);
        }
    }

    // UTILS
    static formatDate(timestamp){
        const now = moment();
        const time = moment(timestamp);
        const diff = now.diff(time, 'minutes');
        
        if (diff == 0){
         return "now";
        }else if (diff < 60) {
          return `${diff}m`;
        } else if (diff < 24 * 60) {
          return `${Math.floor(diff / 60)}h`;
        } else if (diff < 7 * 24 * 60) {
          return `${Math.floor(diff / (24 * 60))}d`;
        } else if (now.year() === time.year()) {
          return time.format('DD MMM');
        } else {
          return time.format('DD MMM YYYY');
        }
    }
      
    // QUERIES
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

    // POST INTERACTIONS
    static async getPostsById(id) {
        try {
            const postDoc = doc(db, "posts", id);
            const postSnapshot = await getDoc(postDoc);

            if (postSnapshot.exists()) {
                const post = postSnapshot.data();
                return post;
            } else {
                console.log("No post found by this id " + username);
                return null;
            }
        } catch (e) {
            console.log("Error getting post: ", e);
            return null;
        }
    }


    // check if the current user has already liked the post with this id
    static async checkIfLiked(id) {
        try {
          const docRef = doc(db, "posts", id);
          
          const postSnapshot = await getDoc(docRef);
          
          if (postSnapshot.exists()) {
            const post = postSnapshot.data();
            
            const liked = post.likes.includes(appUser.username);
            console.log("maremma troia " + liked)
            return liked;
          } else {
            console.log("Post not found");
            return false;
          }
        } catch (e) {
          console.log("Error during checking value: ", e);
          return false;
        }
    }
      
    static async getLikeCount(id){
        try {
            const docRef = doc(db, "posts", id);
            const postSnapshot = await getDoc(docRef);
            if (postSnapshot.exists() && postSnapshot.data()) {
                console.log("SIUMMSM", postSnapshot.data())
                const post = postSnapshot.data();
                return post.likes.length;
            } else {
                console.log("Post not found");
                return null;
            }
        } catch (e) {
            console.log("Error while getting likes number: ", e);
        }
    }

    static async likePost(id){
        try {
            const docRef = doc(db, "posts", id);
            await updateDoc(docRef, {
                likes: arrayUnion(appUser.username)
            });
        } catch (e) {
            console.log("Error during adding default value: ", e);
        }
    }

    static async dislikePost(id){
        try {
            const docRef = doc(db, "posts", id);
            await updateDoc(docRef, {
                likes: arrayRemove(appUser.username)
            });
        } catch (e) {
            console.log("Error during adding default value: ", e);
        }
    }
}