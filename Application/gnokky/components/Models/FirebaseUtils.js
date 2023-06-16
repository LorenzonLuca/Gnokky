import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { db } from "./Firebase"
import { storage } from './Firebase';
import { appUser, updateUser } from "./Globals";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
      const userDoc = doc(db, "users", id);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const user = userSnapshot.data();

        // const fileName = user.username + ".jpg";
        // const storageRef = ref(storage, `profilespic/${fileName}`);

        // console.log(fileName);

        const path = user.username + "/profilepic";
        try {
          // const downloadUrl = await getDownloadURL(storageRef);
          const downloadUrl = await this.getImage(path);
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
  static async findUserFromSearchBar(keyword) {
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
      console.log("Error while trying to search user: ", e);
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

          const tmpUser = await this.getUser(appUser.id);
          updateUser(tmpUser);
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
}