import { collection, addDoc, deleteDoc, doc, setDoc, updateDoc, getDoc, query, where, getDocs, arrayUnion, arrayRemove, orderBy } from "firebase/firestore";
import { db } from "./Firebase"
import { storage } from './Firebase';
import { appUser } from "./Globals";
import { getDownloadURL, ref, uploadBytes, deleteObject, } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AdminUtils {

    static formatDateToText(timestamp) {
        const dateObj = new Date(timestamp);
        
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1; 
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
      
        // Formattazione aggiuntiva per assicurarsi che i numeri abbiano sempre due cifre
        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
      
        // Creazione della stringa formattata
        const formattedDate = `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
      
        return formattedDate;
    }
 
    static async reportPost(post, reason) {
        try {
            const reportsCollectionRef = collection(db, 'reports');
            const reportDocRef = doc(reportsCollectionRef, 'posts'); 
            await setDoc(reportDocRef, {}); 
            const innerCollectionRef = collection(reportDocRef, 'posts'); 
            const docRef = await addDoc(innerCollectionRef, {
                author: appUser.username,
                reason: reason,
                postId: post.id,  
                postOwner: post.owner,
                postCaption: post.caption,
                mediaUrl: post.downloadUrl,
                mediaType: post.mediaType ? post.mediaType : "",
                timestamp: new Date().getTime(),
            });

            console.log("Post has been successfully reported: ",docRef.id);
        } catch (e) {
            console.error("Error reporting post: ", e);
        }
    }

    static async reportStory(username, storyId, reason) {
        try {
            const reportsCollectionRef = collection(db, 'reports');
            const reportDocRef = doc(reportsCollectionRef, 'stories'); 
            await setDoc(reportDocRef, {}); 
            const innerCollectionRef = collection(reportDocRef, 'stories'); 
            const docRef = await addDoc(innerCollectionRef, {
                author: appUser.username,
                reason: reason,
                user: username,
                storyId: storyId,
                timestamp: new Date().getTime(),
            });

            console.log("Story " + storyId + " has been successfully reported: ", docRef.id);
        } catch (e) {
            console.error("Error reporting user: ", e);
        }
    }

    static async getReports(section) {
        try {
          const reportsCollectionRef = collection(db, 'reports');
          const reportDocRef = doc(reportsCollectionRef, section); 
          const innerCollectionRef = collection(reportDocRef, section); 
          const querySnapshot = await getDocs(query(innerCollectionRef, orderBy('timestamp', 'desc')));
          if (!querySnapshot.empty) {
            const reports = [];
            querySnapshot.forEach((doc) => {
              const report = doc.data();
              report.id = doc.id;
              reports.push(report);
            });
            return reports;
          } else {
            console.log("No reports found");
            return [];
          }
        } catch (e) {
          console.log("Error getting reports: ", e);
          return [];
        }
    }   
    
    static async removeReport(section,reportId){
        try {
            const reportsCollectionRef = collection(db, 'reports');
            const reportDocRef = doc(reportsCollectionRef, section); 
            const innerCollectionRef = collection(reportDocRef, section); 
            const repDoc = doc(innerCollectionRef, reportId);
            deleteDoc(repDoc)
                .then(() => {
                    console.log(`Report with id ${reportId} has been removed`);
                })
                .catch((error) => {
                    console.log(`Error while removing the report with id ${reportId}: `, error);
                })
        } catch (error) {
            console.log("Error while removing a report: ", error);
        }
    }
}