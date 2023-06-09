import { View, Text, TextInput, Pressable } from 'react-native';

import profileStyles from '../../styles/Profile';

import Ionicons from '@expo/vector-icons/Ionicons';
import GNProfileImage from '../../components/GNProfileImage';
import app, { storage } from '../../Models/Firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { appUser } from '../../Models/Globals';
import { useState } from 'react';
import FirebaseUtils from '../../Models/FirebaseUtils';
import GNHeader from '../../components/GNHeader';
import GNButton from '../../components/GNButton';



export default function ProfilePage({ navigation, route }) {
    const { property } = route.params;
    const [userData, setUserData] = useState();

    if (userData === undefined) {
        FirebaseUtils.getUser(appUser.id).then((result) => {
            appUser.setUsername(result.username)
            const fileName = result.username + ".jpg";
            const storageRef = ref(storage, `profilespic/${fileName}`);

            getDownloadURL(storageRef)
                .then((downloadUrl) => {
                    result.profilePic = downloadUrl;
                    appUser.setProfilePic(downloadUrl);
                    setUserData(result);
                })
                .catch((error) => {
                    console.log("Error getting download URL:", error);
                });
        });
        return (
            <View style={profileStyles.container}>
                <GNHeader title={"Inculati"} />
                <Text style={{ color: '#fff' }}>Loading Profile...</Text>
            </View>
        );

    } else {
        if (property) {

            const handleEditProfile = () => {
                navigation.navigate("ProfileManagement", { title: "Edit Profile" })
            }

            return (
                <View style={profileStyles.container}>
                    <GNHeader title={"GNokky"} />
                    <View style={profileStyles.background}>
                        <View style={profileStyles.rowContainer}>
                            <View style={[profileStyles.container, profileStyles.background]}>
                                <GNProfileImage selectedImage={userData.profilePic} size={80} />
                                <Text>@{userData.username}</Text>
                                <Text>{userData.name} {userData.surname}</Text>
                            </View>
                            <View style={[profileStyles.container, profileStyles.background]}>
                                <Text>{userData.followers}</Text>
                                <Text>Followers:</Text>
                            </View>
                            <View style={[profileStyles.container, profileStyles.background]}>
                                <Text>{userData.following}</Text>
                                <Text>Following:</Text>
                            </View>
                            <View style={[profileStyles.container, profileStyles.background]}>
                                <Text>{userData.posts}</Text>
                                <Text>Posts:</Text>
                            </View>
                        </View>
                        <View style={profileStyles.bioContainer}>
                            <Text numberOfLines={5} style={{ flexWrap: 'wrap', }}>{userData.bio}</Text>
                        </View>
                        <GNButton title={"Edit Profile"} onPress={handleEditProfile} />
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
}