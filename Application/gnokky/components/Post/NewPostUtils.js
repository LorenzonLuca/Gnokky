import * as Location from 'expo-location';
import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../../private.conf';
import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { db } from "../Models/Firebase"
import { storage } from '../Models/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { appUser } from '../Models/Globals';

export default class NewPostUtils {

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

    static async insertNewPost(mediaUri, mediaType, caption = "", locationInfo = "",){
        try{
            let downloadUrl = "";
            if(mediaUri && mediaType){
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
                comments: [],
                repost: 0,
                location: locationInfo,
                caption: caption,
                downloadUrl: downloadUrl,
                mediaType: mediaType,
                timestamp: new Date().getTime(),
              }
            );

            console.log("new post id: "+ postDocRef.id);

            const userDocRef = doc(db, "users", appUser.id);

            await updateDoc(userDocRef, {
                posts: arrayUnion(postDocRef.id),
            });

            console.log(appUser.username + "'s post has been uploaded successfully into firebase");
        } catch (e){
            console.log("error uploading new post into firestore/storage "+ e);
        }
    }
}