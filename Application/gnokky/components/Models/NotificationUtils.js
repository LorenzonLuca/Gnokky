import { collection, addDoc, doc, getDocs, deleteDoc, } from "firebase/firestore";
import { db } from "./Firebase"
import FirebaseUtils from "./FirebaseUtils";
import { appUser } from "./Globals";
import PostUtils from "./PostUtils";
import StoriesUtils from "./StoriesUtils";

export default class NotificationUtils {
    static async insertNotificationPost(postId, type, user) {
        try {
            const userId = await FirebaseUtils.getIdFromUsername(user);

            const userDocRef = doc(db, "users", userId);
            const notificationRef = collection(userDocRef, 'notification');

            await addDoc(notificationRef, {
                class: 'post',
                postId: postId,
                type: type,
                user: appUser.id,
                timestamp: new Date().getTime(),
            });

            console.log("Orcodio ho mandato un anotifica");

        } catch (error) {
            console.log("Error while trying to add post notification ", error);
        }
    }
    static async insertNotificationStory(storyId, user) {
        try {
            console.log("userrrrrrr ", user);
            const userId = await FirebaseUtils.getIdFromUsername(user);

            const userDocRef = doc(db, "users", userId);
            const notificationRef = collection(userDocRef, 'notification');

            await addDoc(notificationRef, {
                class: 'story',
                storyId: storyId,
                user: appUser.id,
                timestamp: new Date().getTime(),
            });

            console.log("Orcodio ho mandato un anotifica");

        } catch (error) {
            console.log("Error while trying to add story notification ", error);
        }
    }
    static async insertNotificationProfile(userId) {
        const userDocRef = doc(db, "users", userId);
        const notificationRef = collection(userDocRef, 'notification');

        await addDoc(notificationRef, {
            class: 'profile',
            user: appUser.id,
            timestamp: new Date().getTime(),
        });

        console.log("Orcodio ho mandato un anotifica per il profile");
    }
    static async fetchNotification() {
        try {
            const userDocRef = doc(db, "users", appUser.id);
            const notificationRef = collection(userDocRef, 'notification');

            const notificationSnapshot = await getDocs(notificationRef);

            if (!notificationSnapshot.empty) {
                const promises = notificationSnapshot.docs.map(async (doc) => {
                    const notificationData = doc.data();
                    notificationData.id = doc.id;
                    console.log("Notification:", notificationData);

                    const user = await FirebaseUtils.getUser(notificationData.user);
                    console.log("Ma managgia addio che cazzo carica", user);
                    notificationData.user = user;
                    console.log("User: ", user);

                    if (notificationData.postId) {
                        const post = await PostUtils.getPostById(notificationData.postId);
                        if (post) {
                            notificationData.post = post;
                            console.log("Post: ", post);
                        } else {
                            console.log("Post doesn't exist");
                            this.removeNotification(appUser.id, notificationData.id);
                            return null;
                        }
                    }

                    if (notificationData.storyId) {
                        const story = await StoriesUtils.getStoryById(notificationData.storyId);
                        if (story === "expired") {
                            notificationData.story = story;
                            console.log("Story: ", story);
                        } else {
                            console.log("Story doesn't exist");
                            this.removeNotification(appUser.id, notificationData.id);
                            return null;
                        }
                    }

                    return notificationData;
                });

                const ultimateNotification = await Promise.all(promises);

                ultimateNotification.sort((a, b) => b.timestamp - a.timestamp);

                return ultimateNotification;
            }
        } catch (error) {
            console.log("Error while fetching notifications:", error);
        }
    }
    static async removeNotification(userId, notificationId) {
        try {
            const userDocRef = doc(db, "users", userId);
            const notDocRef = doc(userDocRef, "notification", notificationId);

            deleteDoc(notDocRef)
                .then(() => {
                    console.log(`Notification with id ${notificationId} has been deleted`);
                })
                .catch((error) => {
                    console.log(`Error while deleting the notification with id ${notificationId}: `, error);
                });

        } catch (error) {
            console.log("Error while removeing a notification ", error);
        }
    }
}