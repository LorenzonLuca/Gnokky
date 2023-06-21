import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import GNProfileImage from '../GN/GNProfileImage';
import { appUser, COLORS, dataStoreEmitter } from '../Models/Globals';
import GNText from '../GN//GNText';
import GNButton from '../GN//GNButton';
import { useEffect, useState } from 'react';
import FirebaseUtils from '../Models/FirebaseUtils';
import ProfileManagement from './ProfileManagement';
import StoriesUtils from '../Models/StoriesUtils';
import StoriesVisualizer from '../GN/StoriesVisualizer';


export default function ProfileData({ user }) {
    const [userData, setUserData] = useState(user);
    let property = user.id === appUser.id;
    const [alreadyFollowing, setAlreadyFollowing] = useState(user.followers.includes(appUser.username));
    const [modalVisible, setModalVisible] = useState(false);
    const [storiesModal, setStoriesModal] = useState(false);
    const [stories, setStories] = useState([]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            //backgroundColor: COLORS.background,
        },
        bodyText: {
            fontSize: 16,
        },
        background: {
            //backgroundColor: COLORS.background,
            alignItems: 'center',
            justifyContent: 'center',
        },
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            width: '100%',
            padding: 10,
            color: COLORS.textBlack
        },
        bioContainer: {
            //backgroundColor: COLORS.background,
            margin: 20,
            marginTop: 0,
        },
    });


    if (property) {
        useEffect(() => {
            console.log("useEffect triggered");

            if (!modalVisible) {
                console.log("update profile values");
                FirebaseUtils.getUser(appUser.id)
                    .then((newUser) => {
                        appUser.updateOnlyValues(newUser)
                        setUserData(newUser);
                    })
            }
        }, [modalVisible])

        useEffect(() => {
            console.log("useEffect triggered");
            const updateUser = () => {
                console.log("UPdated values user siummmmmmmmmmmmmmmmm");
                setUserData(appUser);
            };

            dataStoreEmitter.on('changeUser', updateUser);

            return () => {
                dataStoreEmitter.off('changeUser', updateUser);
            };
        }, [userData.profilePic, userData.posts.length, userData.name, userData.surname
            , userData.bio, userData.followers.length, userData.following.length]);


    } else {
        useEffect(() => {
            setAlreadyFollowing(userData.followers.includes(appUser.username));
        }, [userData]);
    }

    useEffect(() => {
        if (userData.id) {
            StoriesUtils.getStoriesByUsername(userData.username)
                .then((result) => {
                    console.log("DIOCODCJDOICNDIO", result);
                    setStories(result);
                })
        }
    }, [storiesModal]);

    const handleEditProfile = () => {
        setModalVisible(true);
    }

    const handleFollowing = () => {
        console.log("Following " + userData.username);
        FirebaseUtils.followSomeone(userData.id)
            .then(() => {
                FirebaseUtils.getUser(userData.id)
                    .then((newUser) => {
                        setUserData(newUser);
                    })
            })
            .catch((error) => {
                console.log("Error while following:", error);
            });
    };

    const handleOpenStories = () => {
        setStoriesModal(true);
    }

    return (
        <View style={[styles.background, { marginBottom: 5 }]}>
            <View style={styles.rowContainer}>
                <View style={[styles.container, styles.background]}>
                    <TouchableOpacity onPress={handleOpenStories}>
                        <GNProfileImage selectedImage={userData.profilePic} size={80} />
                    </TouchableOpacity>
                    <Modal visible={storiesModal} animationType='slide'>
                        <StoriesVisualizer
                            stories={stories}
                            property={true}
                            viewAction={property}
                            closeStories={() => setStoriesModal(false)}
                        />
                    </Modal>
                    <GNText>@{userData.username}</GNText>
                </View>
                <View style={[styles.container, styles.background]}>
                    <GNText>{userData.followers.length}</GNText>
                    <GNText>Followers</GNText>
                </View>
                <View style={[styles.container, styles.background]}>
                    <GNText>{userData.following.length}</GNText>
                    <GNText>Following</GNText>
                </View>
                <View style={[styles.container, styles.background]}>
                    <GNText>{userData.posts.length}</GNText>
                    <GNText>Posts</GNText>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <GNText>{userData.name} {userData.surname}</GNText>
            </View>
            <View style={[styles.rowContainer, styles.bioContainer]}>
                <GNText numberOfLines={5} style={{ flexWrap: 'wrap', }}>{userData.bio}</GNText>
            </View>
            {property ? (
                <>
                    <GNButton title={"Edit Profile"} onPress={handleEditProfile} />
                    <Modal visible={modalVisible} animationType="slide">
                        <ProfileManagement title={"Edit profile"} onSave={() => setModalVisible(false)}></ProfileManagement>
                    </Modal>
                </>

            ) : (
                <>
                    {!alreadyFollowing ? (
                        <GNButton title={"Follow"} onPress={handleFollowing} />
                    ) : (
                        <GNButton title={"Unfollow"} />
                    )}
                </>
            )}
        </View>
    );
}