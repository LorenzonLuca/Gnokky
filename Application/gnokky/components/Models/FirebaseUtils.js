import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion, arrayRemove } from "firebase/firestore";
import app, { db } from "./Firebase"
import { storage } from './Firebase';
import { appUser } from "./Globals";
import { getDownloadURL, ref, uploadBytes, deleteObject, } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class FirebaseUtils {

    static async insertUser(username, email) {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                username: username.toLowerCase(),
                email: email,
                timestamp: new Date().getTime(),
            });

            appUser.setUsername(username);
            appUser.setEmail(email);
            appUser.setId(docRef.id);


            const storeUserData = async (value) => {
                try {
                    await AsyncStorage.setItem('userID', value);
                } catch (e) {
                    console.log("error while trying to save user id in async storage");
                }
            };

            storeUserData(docRef.id);

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    static async insertPersonalInformation(name, surname, bio) {
        try {
            const docRef = doc(db, "users", appUser.id);

            await updateDoc(docRef, {
                name: name,
                surname: surname,
                bio: bio,
            });
        } catch (e) {
            console.log("Error during adding personal information: ", e);
        }
    }
    static async setDefaultValue() {
        try {
            const docRef = doc(db, "users", appUser.id);

            await updateDoc(docRef, {
                posts: [],
                followers: [],
                following: [],
            });

        } catch (e) {
            console.log("Error during adding default value: ", e);
        }
    }
    static async getUser(id) {
        try {
            console.log("Boiaaaa ", id);
            const userDoc = doc(db, "users", id);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                const user = userSnapshot.data();

                const path = user.username + "/profilepic";
                try {
                    // const downloadUrl = await getDownloadURL(storageRef);
                    const downloadUrl = await this.getImage(path);
                    user.id = id;
                    user.profilePic = downloadUrl;
                    console.log(user);
                    return user;
                } catch (error) {
                    console.log('Error getting download URL:', error);
                    return null;
                }
            } else {
                console.log("User not found");
                return null;
            }
        } catch (e) {
            console.log("Error while trying to get data from Firestore: ", e);
            return null;
        }
    }
    static async getUserByEmail(email) {
        try {
            const usersCollection = collection(db, "users");
            const querySnapshot = await getDocs(query(usersCollection, where("email", "==", email)));

            if (!querySnapshot.empty) {
                const users = [];
                querySnapshot.forEach((doc) => {
                    const user = doc.data();
                    user.id = doc.id;
                    users.push(user);
                });
                console.log(users);
                return users;
            } else {
                console.log("No users found with the specified property");
                return null;
            }
        } catch (e) {
            console.log("Error while trying to get data from Firestore: ", e);
            return null;
        }
    }
    static async getUserByUsername(username) {
        try {
            const usersCollection = collection(db, "users");
            const querySnapshot = await getDocs(query(usersCollection, where("username", "==", username)));

            if (!querySnapshot.empty) {
                const users = [];
                const downloadUrlPromises = [];

                querySnapshot.forEach((doc) => {
                    const user = doc.data();
                    user.id = doc.id;
                    const path = user.username + "/profilepic";
                    const downloadUrlPromise = this.getImage(path)
                        .then((downloadUrl) => {
                            user.profilePic = downloadUrl;
                            users.push(user);
                        })
                        .catch((error) => {
                            console.log("Error getting download URL:", error);
                        });

                    downloadUrlPromises.push(downloadUrlPromise);
                });

                await Promise.all(downloadUrlPromises);
                return users;
            } else {
                console.log("No users found with the specified property");
                return null;
            }
        } catch (e) {
            console.log("Error while trying to get data from Firestore: ", e);
            return null;
        }
    }
    static async oldFindUserFromSearchBar(keyword) {
        try {
            const usersCollection = collection(db, "users");
            const querySnapshot = await getDocs(query(usersCollection, where('username', '>=', keyword)
                , where('username', '<', keyword + '~'), where('username', '!=', appUser.username)));

            if (!querySnapshot.empty) {
                const users = [];
                const downloadUrlPromises = [];

                querySnapshot.forEach((doc) => {
                    const user = doc.data();
                    user.id = doc.id;
                    console.log("ID DEL DIOCANE", doc.id);
                    const path = user.username + "/profilepic";
                    const downloadUrlPromise = this.getImage(path)
                        .then((downloadUrl) => {
                            user.profilePic = downloadUrl;
                            users.push(user);
                        })
                        .catch((error) => {
                            console.log("Error getting download URL:", error);
                        });

                    downloadUrlPromises.push(downloadUrlPromise);
                });

                await Promise.all(downloadUrlPromises);
                console.log("RICERCA PAZZA SGRAVA ", users);
                return users;
            } else {
                console.log("No users found with the specified property");
                return [];
            }
        } catch (e) {
            console.log("Error while trying to search user: ", e);
        }
    }

    static async findUserFromSearchBar(keyword) {
        try {
            const usersCollection = collection(db, "users");
            const querySnapshot = await getDocs(query(usersCollection, where('username', '>=', keyword)
                , where('username', '<', keyword + '~'), where('username', '!=', appUser.username)));

            if (!querySnapshot.empty) {
                const users = [];

                querySnapshot.forEach((doc) => {
                    const user = doc.data();
                    users.push(user.username);
                });

                return users;
            } else {
                console.log("No users found with the specified property");
                return [];
            }
        } catch (error) {
            console.log("Error while trying to search user: ", error);
        }
    }

    static async followSomeone(id) {
        try {
            const user = await this.getUser(id);
            if (user) {
                const docRef = doc(db, "users", id);

                await updateDoc(docRef, {
                    followers: arrayUnion(appUser.username),
                });

                const myself = await this.getUser(appUser.id);
                if (myself) {
                    const myDocRef = doc(db, "users", appUser.id);

                    await updateDoc(myDocRef, {
                        following: arrayUnion(user.username),
                    });

                    // const tmpUser = await this.getUser(appUser.id);
                    // updateUser(tmpUser);
                }

                console.log("Successfully updated user data.");
            } else {
                console.log("User not found.");
            }
        } catch (error) {
            console.log("Error while following someone:", error);
        }
    }

    static async getImage(path) {
        path = path.toLowerCase();
        const storageRef = ref(storage, path);
        try {
            const downloadUrl = await getDownloadURL(storageRef);
            return downloadUrl;
        } catch (e) {
            console.log("Error while getting profile image: " + e);
        }
    }
    static async uploadImage(imageUri, path) {
        path = path.toLowerCase();
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, blob);
    }

    static async getProfilePicFromUsername(username) {
        const path = username + "/profilepic";
        try {
            const downloadUrl = await this.getImage(path);
            return downloadUrl;
        } catch (error) {
            console.log('Error getting download URL:', error);
            return null;
        }
    }

    static async removeImage(uri) {
        try {
            const storageRef = ref(storage, uri);

            deleteObject(storageRef)
                .then(() => {
                    console.log("Image succesfully removed");
                })
                .catch((error) => {
                    console.log("Error while removing image from storage: " + error);
                })
        } catch (error) {
            console.log("Error while removing an image from the storage: " + error);
        }
    }

    static async removeFollower(username) {
        try {
            const docRef = doc(db, "users", appUser.id);
            await updateDoc(docRef, {
                followers: arrayRemove(username)
            });

            const user = await this.getUserByUsername(username);
            console.log("aaaaaaaaaaaaaaaaaaaaaa", user)
            const userDocRef = doc(db, "users", user[0].id);

            await updateDoc(userDocRef, {
                following: arrayRemove(appUser.username)
            })
        } catch (error) {
            console.log("error while trying to remove an user from your followers: ", error);
        }
    }

    static async getIdFromUsername(username) {
        try {
            const usersCollectionRef = collection(db, 'users');
            const userQuery = query(usersCollectionRef, where('username', '==', username));
            const userSnapshot = await getDocs(userQuery);

            if (userSnapshot.size > 0) {
                let id = "";

                userSnapshot.docs.map(async (doc) => {
                    id = doc.id;
                });

                console.log("user id:", id);

                return id;
            }
        } catch (error) {
            console.log("Error while trying to get id from username", error);
        }

    }

    static async updateAppUser() {
        try {
            const newUser = await this.getUser(appUser.id);

            appUser.setUsername(newUser.username);
            appUser.setName(newUser.name);
            appUser.setSurname(newUser.surname);
            appUser.setBio(newUser.bio);
            appUser.setFollowers(newUser.followers);
            appUser.setFollowing(newUser.following);
            appUser.setPosts(newUser.posts);
            appUser.setProfilePic(newUser.profilePic);
        } catch (error) {
            console.log("Error while trying to update value of appUser: ", error);
        }
    }
}