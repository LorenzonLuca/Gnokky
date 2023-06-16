import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { db } from "./Firebase"
import { appUser } from "./Globals";

export default class StoriesUtils {
    static async postStory(url) {
        try {
            const docRef = await addDoc(collection(db, "stories"), {
                owner: appUser.username,
                img: url,
                timestamp: new Date().getTime(),
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}