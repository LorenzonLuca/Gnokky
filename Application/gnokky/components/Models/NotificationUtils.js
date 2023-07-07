import {
    collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs,
    arrayUnion, orderBy, deleteDoc, arrayRemove
} from "firebase/firestore";
import { db } from "./Firebase"
import FirebaseUtils from "./FirebaseUtils";
import { appUser } from "./Globals";
import moment from "moment";
import PostUtils from "./PostUtils";

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

                    const post = await PostUtils.getPostById(notificationData.postId);
                    notificationData.post = post;
                    console.log("Post: ", post);

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

}