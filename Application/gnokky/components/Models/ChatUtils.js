import {
    collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs,
    arrayUnion, orderBy, deleteDoc, arrayRemove, onSnapshot
} from "firebase/firestore";
import { db } from "./Firebase"
import FirebaseUtils from "./FirebaseUtils";
import { appUser } from "./Globals";

export default class ChatUtils {
    static async getAllChats(keyword = "") {
        try {
            const userDocRef = doc(db, "users", appUser.id);
            const chatRef = collection(userDocRef, 'chats');
            const chatsSnapshot = await getDocs(query(chatRef, where('user', '>=', keyword)
                , where('user', '<', keyword + '~'), where('user', '!=', appUser.username)));

            const chatPromises = chatsSnapshot.docs.map(async (doc) => {
                const chat = doc.data();
                console.log("DIOCANEEEEEEEEEEEEEEEEEEEE", chat);
                let tmpChat = await FirebaseUtils.getUserByUsername(chat.user);
                console.log(chat.chatID);
                console.log("BEVOOOOOO", tmpChat)
                tmpChat[0].chatId = chat.chatID
                return tmpChat;
            });

            const chats = await Promise.all(chatPromises);
            return chats.flat();
            // return chats;
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

    static async fetchChat(id, updateCallback) {
        console.log("MI PIGLI PER IL CULO?");
        return new Promise((resolve, reject) => {
            const chatDocRef = doc(db, "chats", id);

            console.log("DIOCANE DOVE CAZZO È IL PROBLEMA");
            onSnapshot(collection(chatDocRef, 'messages'), (querySnapshot) => {
                console.log("PORCODIDDDDIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
                const updatedData = querySnapshot.docs.map((doc) => doc.data());

                var res = updatedData.sort(({ timestamp: a }, { timestamp: b }) => b - a);

                updateCallback(res.reverse());
            }, reject);
        });
    }

    static async sendMessage(chatId, text) {
        try {
            const chatDocRef = doc(db, "chats", chatId);
            const innerCollectionRef = collection(chatDocRef, 'messages');

            console.log("BOIAAA");

            await addDoc(innerCollectionRef, {
                owner: appUser.username,
                text: text,
                timestamp: new Date().getTime(),
            });

            console.log("BOIAAAAAA");
        } catch (error) {
            console.log("Error while trying to send a message: ", error);
        }
    }
}