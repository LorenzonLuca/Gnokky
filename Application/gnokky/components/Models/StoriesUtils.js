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
                likes: [],
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

                    if (currentTime.diff(story.timestamp, 'hours') > 24) {
                        oldStories.push(story);
                        console.log("Pushing in oldStory ", story.id);
                    } else {
                        console.log("DIFFERENZA DI TEMPO (PER ELIMINARE LA STORIA): ", currentTime.diff(story.timestamp, 'days'), " for story: ", story.id);
                        stories.push(story);
                    }
                });
                console.log("le storie di ", username, " mannaggia a ddio sono: ", stories);
                this.removeOldStories(oldStories);

                console.log("All stories: ", stories);
                console.log("Too old stories: ", oldStories)

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


            await updateDoc(docRef, {
                watchedBy: arrayUnion(username)
            });
        } catch (e) {
            console.log("Error during adding personal information: ", e);
        }
    }

    static async removeOldStories(stories) {
        try {

            await stories.forEach(async (story) => {
                await this.removeStory(story);
            })

        } catch (e) {
            console.log("Error during adding default value: ", e);
        }
    }

    static async removeStory(story) {
        console.log("diotacchino ", story)
        try {
            const docRef = doc(db, "stories", story.id);

            deleteDoc(docRef)
                .then(() => {
                    console.log(`Story with id ${story} has been deleted`);
                })
                .catch((error) => {
                    console.log("Error while deleting a story: ", error);
                })

            await FirebaseUtils.removeImage(story.img);
        } catch (error) {
            console.log("Error while removing a story: ", error);
        }
    }

    static async getAllProfilePic(myStories) {
        const result = await Promise.all(myStories.map(async (story) => {
            const newWatchedBy = await Promise.all(story.watchedBy.map(async (user) => {
                const profilePic = await FirebaseUtils.getProfilePicFromUsername(user);
                return { username: user, profilePic: profilePic };
            }));
            console.log(newWatchedBy);
            return { ...story, watchedBy: newWatchedBy };
        }));

        return result;
    }

    static async likeAStory(idStory) {
        try {
            const docRef = doc(db, "stories", idStory);

            await updateDoc(docRef, {
                likes: arrayUnion(appUser.username)
            });
        } catch (error) {
            console.log("Error while trying to like a post: ", error);
        }
    }

    static async removeLikeAStory(idStory) {
        try {
            const docRef = doc(db, "stories", idStory);

            await updateDoc(docRef, {
                likes: arrayRemove(appUser.username)
            });
        } catch (error) {
            console.log("Error while trying to like a post: ", error);
        }
    }

    static async getStoryById(id) {
        try {
            const docRef = doc(db, "stories", id);
            const storySnapshot = await getDoc(docRef);

            if (storySnapshot.exists()) {
                const story = storySnapshot.data();
                story.id = storySnapshot.id;
                return story;
            } else {
                console.log("Story not found");
                return "expired";
            }
        } catch (error) {
            console.log("Error while trying to get story, ", error)
        }
    }
}