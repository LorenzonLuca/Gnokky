import { View, Text, TextInput, Pressable } from 'react-native';

import profileStyles from '../../styles/Profile';

import GNProfileImage from '../GN/GNProfileImage';
import { storage } from '../Models/Firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { appUser } from '../Models/Globals';
import { useState } from 'react';
import FirebaseUtils from '../Models/FirebaseUtils';
import GNText from '../GN/GNText';
import GNButton from '../GN/GNButton';



export default function ProfilePage({ navigation, route }) {
    const { property } = route.params;

    if (property) {

        const handleEditProfile = () => {
            navigation.navigate("ProfileManagement", { title: "Edit Profile" })
        }

        return (
            <View style={profileStyles.container}>
                <View style={[profileStyles.background, { marginBottom: 20 }]}>
                    <View style={profileStyles.rowContainer}>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNProfileImage selectedImage={appUser.profilePic} size={80} />
                            <GNText>@{appUser.username}</GNText>
                        </View>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNText>{appUser.followers}</GNText>
                            <GNText>Followers</GNText>
                        </View>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNText>{appUser.following}</GNText>
                            <GNText>Following</GNText>
                        </View>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNText>{appUser.posts}</GNText>
                            <GNText>Posts</GNText>
                        </View>
                    </View>
                    <View style={profileStyles.rowContainer}>
                        <GNText>{appUser.name} {appUser.surname}</GNText>
                    </View>
                    <View style={[profileStyles.rowContainer, profileStyles.bioContainer]}>
                        <GNText numberOfLines={5} style={{ flexWrap: 'wrap', }}>{appUser.bio}</GNText>
                    </View>
                    <GNButton title={"Edit Profile"} onPress={handleEditProfile} />
                </View>

                <GNText>Your Profile Page</GNText>
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