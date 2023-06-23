import {
    collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs,
    arrayUnion, orderBy, deleteDoc, arrayRemove
} from "firebase/firestore";
import { db } from "./Firebase"
import FirebaseUtils from "./FirebaseUtils";
import { appUser } from "./Globals";

export default class ChatUtils {
    static async getAllChats(keyword) {
        try {
            const userDocRef = doc(db, "users", appUser.id);
            const chatRef = collection(userDocRef, 'chats');
            const chatsSnapshot = await getDocs(query(chatRef, where('user', '>=', keyword)
                , where('user', '<', keyword + '~'), where('user', '!=', appUser.username)));

            const chatPromises = chatsSnapshot.docs.map(async (doc) => {
                const chat = doc.data();
                console.log("DIOCANEEEEEEEEEEEEEEEEEEEE", chat);
                const tmpChat = await FirebaseUtils.getUserByUsername(chat.user);
                return tmpChat;
            });

            const chats = await Promise.all(chatPromises);
            return chats.flat();
        } catch (e) {
            console.log("Error getting chats from user: ", e);
            return [];
        }
    }

    static async createChat(username, idUser) {
        try {
            const chatRef = await addDoc(collection(db, "chats"), {
                users: [appUser.username, username]
            });

            const chatId = chatRef.id;

            console.log("ID Della chat: " + chatId);

            const userDocRef = doc(db, "users", appUser.id);
            const innerCollectionRef = collection(userDocRef, 'chats');
            await addDoc(innerCollectionRef, {
                user: username,
                chatID: chatId
            });

            const otherUserDocRef = doc(db, "users", idUser);
            const otherInnerCollectionRef = collection(otherUserDocRef, 'chats');
            await addDoc(otherInnerCollectionRef, {
                user: appUser.username,
                chatID: chatId
            });

        } catch (error) {
            console.log("Error while creating a new chat with ", username, ": ", error);
        }
    }

    static async fetchChat(id) {

    }
}