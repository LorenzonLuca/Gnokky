import { View, Text, TextInput, Pressable } from 'react-native';

import profileStyles from '../../styles/Profile';

import Ionicons from '@expo/vector-icons/Ionicons';
import GNProfileImage from '../../components/GNProfileImage';
import { storage } from '../../Models/Firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { appUser } from '../../Models/Globals';
import { useState } from 'react';
import FirebaseUtils from '../../Models/FirebaseUtils';



export default function ProfilePage({ navigation, route }) {
    const { property } = route.params;
    const [profilePic, setProfilePic] = useState();

    const fileName = appUser.username + ".jpg";
    const storageRef = ref(storage, `profilespic/${fileName}`);

    getDownloadURL(storageRef)
        .then((downloadUrl) => {
            setProfilePic(downloadUrl);
        })
        .catch((error) => {
            console.log("Error getting download URL:", error);
        });

    const user = FirebaseUtils.getUser(appUser.id);
    console.log(user);
    if (property) {
        return (
            <View style={profileStyles.container}>
                <View style={profileStyles.rowContainer}>
                    <GNProfileImage selectedImage={profilePic} />
                    <Text></Text>
                </View>
                <Text>Your Profile Page</Text>
            </View>
        );
    } else {
        return (
            <View style={profileStyles.container}>
                <Text>Not Your Profile Page</Text>
            </View>
        );
    }
}