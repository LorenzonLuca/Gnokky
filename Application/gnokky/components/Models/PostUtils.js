import * as Location from 'expo-location';
import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../../private.conf';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion,arrayRemove, orderBy} from "firebase/firestore";
import { db } from "./Firebase"
import { storage } from './Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { appUser } from './Globals';
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

    static async insertNewPost(mediaUri, mediaType, caption = "", locationInfo = "", repostRef = "") {
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
                likes: [],
                repost: repostRef,
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
    static async getPostsByUser(username, limit = false) {
        try {
            const postsCollection = collection(db, "posts");
            const querySnapshot = await getDocs(query(postsCollection, where('owner', '==', username), orderBy('timestamp','desc')));
            const profilePic = await FirebaseUtils.getProfilePicFromUsername(username);

            if (!querySnapshot.empty) {
                const posts = [];
                const currentTime = moment();
                querySnapshot.forEach((doc) => {
                    const post = doc.data();
                    post.id = doc.id;
                    post.ownerProfilePicUrl = profilePic;
                    // if(limit){
                    //     if (currentTime.diff(post.timestamp, 'days') <= 2) {
                    //         posts.push(post);
                    //     } 
                    // } else {
                    //     posts.push(post);
                    // }
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
    static async getPostById(postId) {
        try {
            const postDoc = doc(db, "posts", postId);
            const postSnapshot = await getDoc(postDoc);
            if (postSnapshot.exists()) {
                const post = postSnapshot.data();
                post.id = postSnapshot.id;
                post.ownerProfilePicUrl = await FirebaseUtils.getProfilePicFromUsername(post.owner);
                return post;
            } else {
                console.log("No post found by this id ", postId);
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

    static async insertComment(postId, text) {
        try {
            const postDocRef = doc(db, "posts", postId);
            const innerCollectionRef = collection(postDocRef, 'comments');
            await addDoc(innerCollectionRef, {
                owner: appUser.username,
                text: text,
                timestamp: new Date().getTime(),
            });
        } catch (e) {
            console.log("Error during adding default value: ", e);
        }
    }


    static async fetchComments(postId) {
        try {
          const postDocRef = doc(db, "posts", postId);
          const commentsRef = collection(postDocRef, 'comments');
          const commentsSnapshot = await getDocs(commentsRef);
      
          const comments = [];
          commentsSnapshot.forEach((doc) => {
            const comment = doc.data();
            comment.id = doc.id;
            comments.push(comment);
          });
          const sortedComments = this.sortComments(comments);
          return sortedComments;
        } catch (e) {
          console.log("Error getting post's comments: ", e);
          return [];
        }
    }
      
    static sortComments(comments) {
        // Ordina l'array di commenti in base alla proprietà timestamp
        const sortedComments = comments.sort((a, b) => b.timestamp - a.timestamp);
        return sortedComments;
    }

    static async getCommentsCount(postId){
        try {
            const postDocRef = doc(db, "posts", postId);
            const commentsRef = collection(postDocRef, 'comments');
            const commentsSnapshot = await getDocs(commentsRef);
            const commentsCount = commentsSnapshot.size;
            return commentsCount;
        } catch (error) {
            console.error('Errore durante il conteggio dei commenti:', error);
        }
    }

    static async deletePost(post){
        try {
            const docRef = doc(db, "posts", post.id);
            const ownerId = await FirebaseUtils.getIdFromUsername(post.owner);
            const userRef = doc(db, "users", ownerId);
            await updateDoc(userRef, {
                posts: arrayRemove(post.id)
            });

            deleteDoc(docRef)
                .then(() => {
                    console.log(`Post with id ${post.id} has been deleted`);
                })
                .catch((error) => {
                    console.log(`Error while deleting the post with id ${post.id}: `, error);
                });
            
            if(post.downloadUrl != ""){
                await FirebaseUtils.removeImage(post.downloadUrl);
            }
        } catch (error) {
            console.log("Error while deleting a post: ", error);
        }
    }
}