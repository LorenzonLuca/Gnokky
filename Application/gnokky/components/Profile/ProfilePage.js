import { View, Text, TextInput, Pressable, Modal, StyleSheet } from 'react-native';

import profileStyles from '../../styles/Profile';

import GNProfileImage from '../GN/GNProfileImage';
import { appUser } from '../Models/Globals';
import GNText from '../GN//GNText';
import GNButton from '../GN//GNButton';
import { useEffect, useState } from 'react';
import FirebaseUtils from '../Models/FirebaseUtils';
import ProfileManagement from './ProfileManagement';


export default function ProfilePage({ navigation, route }) {
    const { user } = route.params;
    let property = user.id === appUser.id;

    // if (!userData && !user) {
    //     return (
    //         <View style={profileStyles.container}>
    //             <Text>Loading Profile page</Text>
    //         </View>
    //     );
    // }


    if (property) {
        const [userData, setUserData] = useState(appUser);
        const [modalVisible, setModalVisible] = useState(false);

        useEffect(() => {
            console.log("useEffect triggered");
            if (!modalVisible) {
                FirebaseUtils.getUser(appUser.id)
                    .then((newUser) => {
                        appUser.updateOnlyValues(newUser)
                        setUserData(newUser);
                    })
            }
        }, [modalVisible])

        const handleEditProfile = () => {
            // navigation.navigate("ProfileManagement", { title: "Edit Profile" })
            setModalVisible(true);
        }

        return (
            <View style={profileStyles.container}>
                <View style={[profileStyles.background, { marginBottom: 20 }]}>
                    <View style={profileStyles.rowContainer}>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNProfileImage selectedImage={userData.profilePic} size={80} />
                            <GNText>@{userData.username}</GNText>
                        </View>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNText>{userData.followers}</GNText>
                            <GNText>Followers</GNText>
                        </View>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNText>{userData.following}</GNText>
                            <GNText>Following</GNText>
                        </View>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNText>{userData.posts}</GNText>
                            <GNText>Posts</GNText>
                        </View>
                    </View>
                    <View style={profileStyles.rowContainer}>
                        <GNText>{userData.name} {userData.surname}</GNText>
                    </View>
                    <View style={[profileStyles.rowContainer, profileStyles.bioContainer]}>
                        <GNText numberOfLines={5} style={{ flexWrap: 'wrap', }}>{userData.bio}</GNText>
                    </View>
                    <GNButton title={"Edit Profile"} onPress={handleEditProfile} />
                </View>
                <Modal visible={modalVisible} animationType="slide">
                    <ProfileManagement title={"Edit profile"} onSave={() => setModalVisible(false)}></ProfileManagement>
                </Modal>
                <GNText>Your Profile Page</GNText>
            </View>
        );
    } else {
        const [alreadyFollowing, setAlreadyFollowing] = useState(user.followersUsernames.includes(appUser.username))
        const [userDB, setUserDb] = useState(user);

        useEffect(() => {
            setAlreadyFollowing(userDB.followersUsernames.includes(appUser.username));
        }, [userDB]);

        const handleFollowing = () => {
            console.log("Following " + user.username);
            FirebaseUtils.followSomeone(user.id)
                .then(() => {
                    FirebaseUtils.getUser(user.id)
                        .then((newUser) => {
                            setUserDb(newUser);
                        })
                })
                .catch((error) => {
                    console.log("Error while following:", error);
                });
        };

        return (
            <View style={profileStyles.container}>
                <View style={[profileStyles.background, { marginBottom: 20 }]}>
                    <View style={profileStyles.rowContainer}>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNProfileImage selectedImage={userDB.profilePic} size={80} />
                            <GNText>@{userDB.username}</GNText>
                        </View>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNText>{userDB.followers}</GNText>
                            <GNText>Followers</GNText>
                        </View>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNText>{userDB.following}</GNText>
                            <GNText>Following</GNText>
                        </View>
                        <View style={[profileStyles.container, profileStyles.background]}>
                            <GNText>{userDB.posts}</GNText>
                            <GNText>Posts</GNText>
                        </View>
                    </View>
                    <View style={profileStyles.rowContainer}>
                        <GNText>{userDB.name} {userDB.surname}</GNText>
                    </View>
                    <View style={[profileStyles.rowContainer, profileStyles.bioContainer]}>
                        <GNText numberOfLines={5} style={{ flexWrap: 'wrap', }}>{userDB.bio}</GNText>
                    </View>
                    {!alreadyFollowing ? (
                        <GNButton title={"Follow"} onPress={handleFollowing} />
                    ) : (
                        <GNButton title={"Already Following"} />
                    )}
                </View>

                <GNText>Your Profile Page</GNText>
            </View>
        );
    }
}