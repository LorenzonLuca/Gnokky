import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { db } from "./Firebase"
import { storage } from './Firebase';
import { appUser } from "./Globals";
import { getDownloadURL, ref } from 'firebase/storage';

export default class FirebaseUtils {
  static async insertUser(username, email) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        username: username,
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
        followers: 0,
        following: 0,
        posts: 0,
        followersUsernames: [],
        followingUsernames: [],
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

        const fileName = user.username + ".jpg";
        const storageRef = ref(storage, `profilespic/${fileName}`);

        console.log(fileName);

        try {
          const downloadUrl = await getDownloadURL(storageRef);
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
        , where('username', '<', keyword + '~')));

      if (!querySnapshot.empty) {
        const users = [];
        const downloadUrlPromises = [];

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;

          const fileName = user.username + ".jpg";
          const storageRef = ref(storage, `profilespic/${fileName}`);

          const downloadUrlPromise = getDownloadURL(storageRef)
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
          followers: user.followers + 1,
          followersUsernames: arrayUnion(appUser.username),
        });

        console.log("Successfully updated user data.");
      } else {
        console.log("User not found.");
      }
    } catch (error) {
      console.log("Error while following someone:", error);
    }
  }
}