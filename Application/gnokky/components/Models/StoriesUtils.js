import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion, orderBy } from "firebase/firestore";
import { db } from "./Firebase"
import FirebaseUtils from "./FirebaseUtils";
import { appUser } from "./Globals";

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
            const querySnapshot = await getDocs(query(storiesCollection, where('owner', '==', username), orderBy('timestamp', 'desc')));
            const profilePic = await FirebaseUtils.getProfilePicFromUsername(username);

            if (!querySnapshot.empty) {
                const stories = [];
                querySnapshot.forEach((doc) => {
                    const story = doc.data();
                    story.id = doc.id;
                    story.profilePic = profilePic;
                    stories.push(story);
                });
                console.log("le storie di ", username, " mannaggia a ddio sono: ", stories);
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
}