import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase"
import React from 'react';
import { appUser } from "./Globals";

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
}