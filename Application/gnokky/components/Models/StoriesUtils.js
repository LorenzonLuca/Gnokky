import {
    collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs,
    arrayUnion, orderBy, deleteDoc, arrayRemove
} from "firebase/firestore";
import { db } from "./Firebase"
import FirebaseUtils from "./FirebaseUtils";
import { appUser } from "./Globals";
import moment from "moment";

export default class StoriesUtils {
    static async postStory(url) {
        try {
            const docRef = await addDoc(collection(db, "stories"), {
                owner: appUser.username,
                img: url,
                watchedBy: [],
                timestamp: new Date().getTime(),
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    static async getStoriesByUsername(username) {
        try {
            const storiesCollection = collection(db, "stories");
            const querySnapshot = await getDocs(query(storiesCollection, where('owner', '==', username), orderBy('timestamp', 'asc')));
            const profilePic = await FirebaseUtils.getProfilePicFromUsername(username);

            if (!querySnapshot.empty) {
                const stories = [];
                const oldStories = [];
                const currentTime = moment();

                querySnapshot.forEach((doc) => {
                    const story = doc.data();
                    story.id = doc.id;
                    story.profilePic = profilePic;

                    if (currentTime.diff(story.timestamp, 'days') > 0) {
                        oldStories.push(story);
                    } else {
                        console.log("DIFFERENZA DI TEMPO (PER ELIMINARE LA STORIA): ", currentTime.diff(story.timestamp, 'days'));
                        stories.push(story);
                    }
                });
                console.log("le storie di ", username, " mannaggia a ddio sono: ", stories);
                this.removeOldStories(oldStories);
                return stories;
            } else {
                console.log("No stories found by this username " + username);
                return null;
            }
        } catch (e) {
            console.log("Error getting stories: ", e);
            return null;
        }
    }

    static async viewedStory(idStory, username) {
        try {
            const docRef = doc(db, "stories", idStory);
            const profilePic = await FirebaseUtils.getProfilePicFromUsername(username);


            await updateDoc(docRef, {
                watchedBy: arrayUnion({ "username": username, "profilePic": profilePic })
            });
        } catch (e) {
            console.log("Error during adding personal information: ", e);
        }
    }

    static async removeOldStories(stories) {
        try {

            await stories.forEach(async (story) => {
                const docRef = doc(db, "stories", story.id);


                deleteDoc(docRef)
                    .then(() => {
                        console.log(`Story with id ${story} has been deleted`);
                    })
                    .catch((error) => {
                        console.log("Error while deleting a story: ", error);
                    })

                await FirebaseUtils.removeImage(story.img);
            })

        } catch (e) {
            console.log("Error during adding default value: ", e);
        }
    }
}