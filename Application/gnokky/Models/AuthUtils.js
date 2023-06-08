import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./Firebase"
import React from 'react';

class AuthUtils {
    static async insertUser(username, email){
        try {
            const docRef = await addDoc(collection(db, "users"), {
              username: username,
              email: email,
              timestamp: _chronoNow(),
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
}

export default AuthUtils;