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

            return chatId;

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

    static async sendMessage(chatId, text, isStory = false, isPost = false, isProfile = false) {
        try {
            const chatDocRef = doc(db, "chats", chatId);
            const innerCollectionRef = collection(chatDocRef, 'messages');

            console.log("BOIAAA");

            await addDoc(innerCollectionRef, {
                owner: appUser.username,
                text: text,
                timestamp: new Date().getTime(),
                isStory: isStory,
                isPost: isPost,
                isProfile: isProfile,
            });

            console.log("BOIAAAAAA", text);
        } catch (error) {
            console.log("Error while trying to send a message: ", error);
        }
    }

    static async findChatByUsername(username) {
        try {
            console.log("DIOCAN MO PERCHö NON VA,", username);
            const userDocRef = doc(db, "users", appUser.id);
            const chatRef = collection(userDocRef, 'chats');

            console.log("DIOCANE PRIMA DELLA QUERY");

            const chatsSnapshot = await getDocs(query(chatRef, where('user', '==', username)));

            console.log("DIOBON DOPO ALLA QUERY");

            if (chatsSnapshot.size > 0) {
                let chatId = "";

                chatsSnapshot.docs.map(async (doc) => {
                    chatId = doc.data().chatID;
                });

                console.log("aaaaaaaaaaaaaaaa,", chatId);

                return chatId;
            } else {
                console.log("CREATE CHAT LESSGO");

                const id = await FirebaseUtils.getIdFromUsername(username);

                const chatId = await this.createChat(username, id);

                return chatId;
            }

        } catch (error) {
            console.log("Error while getting chat from username: ", error);
        }
    }

    static async sendStory(chat, story, answer) {
        try {
            console.log("ANSWERSTORYY:", story);
            await this.sendMessage(chat, story.id, true)
            if (answer) {
                this.sendMessage(chat, answer);
            }
        } catch (error) {
            console.log("error while trying to answer or share a story");
        }
    }

    static async sendPost(chat, postId) {
        try {
            console.log("Sharing post: ", postId);
            await this.sendMessage(chat, postId, false, true)
        } catch (error) {
            console.log("error while trying to share a post");
        }
    }

    static async sendProfile(chat, profileId) {
        try {
            console.log("Sharing profile: ", profileId);
            await this.sendMessage(chat, profileId, false, false, true)
        } catch (error) {
            console.log("error while trying to share a post");
        }
    }
}