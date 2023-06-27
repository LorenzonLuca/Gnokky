import { View, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Text, ScrollView } from 'react-native';
import GNProfileImage from '../GN/GNProfileImage';
import { appUser, COLORS, dataStoreEmitter } from '../Models/Globals';
import GNText from '../GN//GNText';
import GNButton from '../GN//GNButton';
import GNTextInput from '../GN/GNTextInput';
import GNAppBar from '../GN/GNAppBar';
import { useEffect, useState } from 'react';
import FirebaseUtils from '../Models/FirebaseUtils';
import ProfileManagement from './ProfileManagement';
import StoriesUtils from '../Models/StoriesUtils';
import StoriesVisualizer from '../GN/StoriesVisualizer';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function ProfileData({ user, property }) {
    const [userData, setUserData] = useState(user);
    const [alreadyFollowing, setAlreadyFollowing] = useState(user.followers.includes(appUser.username));
    const [modalVisible, setModalVisible] = useState(false);
    const [storiesModal, setStoriesModal] = useState(false);
    const [followersModal, setFollowersModal] = useState(false);
    const [stories, setStories] = useState([])
    const [followersList, setFollowersList] = useState([]);
    const [filteredFollower, setFilteredFollower] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setUserData(user);
        StoriesUtils.getStoriesByUsername(user.username)
            .then(async (myStories) => {
                if (property) {
                    console.log("PROPERTYYYYYYYYYYYYY,", myStories);
                    const result = await StoriesUtils.getAllProfilePic(myStories);
                    setStories(result);
                } else {
                    setStories(myStories);
                }
            })
    }, [user])

    if (property) {
        useEffect(() => {
            appUser.updateOnlyValues(userData);
        }, [userData])

    } else {
        useEffect(() => {
            setAlreadyFollowing(userData.followers.includes(appUser.username));
        }, [userData]);
    }

    useEffect(() => {
        if (userData.id) {
            StoriesUtils.getStoriesByUsername(userData.username)
                .then(async (myStories) => {
                    if (property) {
                        console.log("PROPERTYYYYYYYYYYYYY,", myStories);
                        const result = await StoriesUtils.getAllProfilePic(myStories);
                        setStories(result);
                    } else {
                        setStories(myStories);
                    }
                })
        }
    }, [storiesModal]);

    useEffect(() => {
        const fetchUser = async () => {
            await appUser.getValueAndUpdate();
            setUserData(appUser);
        }


        if (property) {
            fetchUser();
        }
    }, [refresh])

    const handleEditProfile = () => {
        setModalVisible(true);
    }

    const handleFollowing = () => {
        console.log("Following " + userData.username);
        console.log("MADONNA PUTTANA SBLAO" + userData.id);
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
        if (stories.length > 0) {
            setStoriesModal(true);
        }
    }

    const handleResearch = (text) => {
        var filteredArray = userData.followers.filter((str) => {
            return str.toLowerCase().indexOf(text.toLowerCase()) >= 0;
        });
        setFilteredFollower(filteredArray);
    }


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
        userListContainer: {
            backgroundColor: COLORS.fourthText,
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            padding: 5,
        },
        userListText: {
            color: COLORS.firtText,
            fontSize: 17,
            marginHorizontal: 10,
            flex: 1
        },
    });

    useEffect(() => {
        const fetchFollowersList = async () => {
            const list = [];
            for (const user of (filteredFollower ? filteredFollower : userData.followers)) {
                const profilePic = await FirebaseUtils.getProfilePicFromUsername(user);
                const followerComponent = (
                    <View key={user} style={styles.userListContainer}>
                        <GNProfileImage selectedImage={profilePic} size={50} />
                        <Text style={styles.userListText}>{user}</Text>
                        <TouchableWithoutFeedback onPress={() => {
                            FirebaseUtils.removeFollower(user)
                            setRefresh(!refresh);
                        }}>
                            <Ionicons name='trash-outline' size={25} color={'red'} />
                        </TouchableWithoutFeedback>
                    </View>
                );
                list.push(followerComponent);
            }
            if (filteredFollower) {
                if (filteredFollower.length < 1) {
                    list.splice(0, list.length);
                    list.push(
                        <View key={user} style={styles.userListContainer}>
                            <Text>There aren't follower with this name</Text>
                        </View>
                    )
                }
            }
            setFollowersList(list);
        };

        fetchFollowersList();
    }, [userData, filteredFollower]);

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
                <TouchableWithoutFeedback onPress={() => setFollowersModal(true)}>
                    <View style={[styles.container, styles.background]}>
                        <GNText>{userData.followers.length}</GNText>
                        <GNText>Followers</GNText>
                    </View>
                </TouchableWithoutFeedback>
                <Modal visible={followersModal} animationType='slide'>
                    <GNAppBar iconLeading='close-outline' onPressLeading={() => {
                        setFollowersModal(false);
                        setFilteredFollower(null);
                    }} iconTrailing='' />
                    <ScrollView>
                        <GNTextInput
                            placeholder="Search"
                            iconName="search-outline"
                            iconNameFocused="search-sharp"
                            onChangeText={handleResearch}
                            animation={true}
                            width={'100%'} />
                        {followersList}
                    </ScrollView>
                </Modal>
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