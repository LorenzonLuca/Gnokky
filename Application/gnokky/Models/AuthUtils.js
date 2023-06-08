import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./Firebase"
import React from 'react';
import { appUser } from "./Globals";

export default class AuthUtils {
    static async insertUser(username, email){
        try {
            const docRef = await addDoc(collection(db, "users"), {
              username: username,
              email: email,
              timestamp: new Date().getTime(),
            });

            appUser.setUsername(username);
            appUser.setEmail(email);

            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
}