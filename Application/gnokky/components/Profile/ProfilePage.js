import { View, Modal, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import GNProfileImage from '../GN/GNProfileImage';
import { appUser, COLORS, dataStoreEmitter } from '../Models/Globals';
import GNText from '../GN//GNText';
import GNButton from '../GN//GNButton';
import { useEffect, useState } from 'react';
import FirebaseUtils from '../Models/FirebaseUtils';
import ProfileManagement from './ProfileManagement';
import _isEqual from 'lodash/isEqual';
import Divider from '../GN/Divider';
import PostLoader from '../GN/PostLoader';

export default function ProfilePage({ navigation, route }) {
    const { user } = route.params;
    let property = user.id === appUser.id;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            //backgroundColor: COLORS.background,
        },
        contentContainer: {
            flexGrow: 1,
            justifyContent: 'center',
        },
        header: {
        },
        body: {
            flex: 1,
            //justifyContent: 'center',
            alignItems: 'center',
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
        const [userData, setUserData] = useState(appUser);
        const [modalVisible, setModalVisible] = useState(false);

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
            , userData.bio, userData.followers.length, userData.following.length])

        const handleEditProfile = () => {
            setModalVisible(true);
        }

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.body}>
                        <View style={[styles.background, {marginBottom: 5}]}>
                            <View style={styles.rowContainer}>
                                <View style={[styles.container, styles.background]}>
                                    <GNProfileImage selectedImage={userData.profilePic} size={80} />
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
                            <GNButton title={"Edit Profile"} onPress={handleEditProfile} />
                        </View>
                        <Modal visible={modalVisible} animationType="slide">
                            <ProfileManagement title={"Edit profile"} onSave={() => setModalVisible(false)}></ProfileManagement>
                        </Modal>
                        <Divider  color={'lightgray'} width={3}/>
                        <View style={{width: '100%'}}>
                            <PostLoader username={userData.username}/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    } else {
        const [alreadyFollowing, setAlreadyFollowing] = useState(user.followers.includes(appUser.username))
        const [userDB, setUserDb] = useState(user);

        useEffect(() => {
            setAlreadyFollowing(userDB.followers.includes(appUser.username));
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
            <SafeAreaView style={styles.container}>
                {/* <View style={styles.header}>
                    <GNAppBar
                        iconLeading='arrow-back-outline'
                        onPressLeading={() => { navigation.goBack() }}
                        iconTrailing='' />
                </View> */}
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.body}>
                        <View style={[styles.background, { marginBottom: 20 }]}>
                            <View style={styles.rowContainer}>
                                <View style={[styles.container, styles.background]}>
                                    <GNProfileImage selectedImage={userDB.profilePic} size={80} />
                                    <GNText>@{userDB.username}</GNText>
                                </View>
                                <View style={[styles.container, styles.background]}>
                                    <GNText>{userDB.followers.length}</GNText>
                                    <GNText>Followers</GNText>
                                </View>
                                <View style={[styles.container, styles.background]}>
                                    <GNText>{userDB.following.length}</GNText>
                                    <GNText>Following</GNText>
                                </View>
                                <View style={[styles.container, styles.background]}>
                                    <GNText>{userDB.posts.length}</GNText>
                                    <GNText>Posts</GNText>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                <GNText>{userDB.name} {userDB.surname}</GNText>
                            </View>
                            <View style={[styles.rowContainer, styles.bioContainer]}>
                                <GNText numberOfLines={5} style={{ flexWrap: 'wrap', }}>{userDB.bio}</GNText>
                            </View>
                            {!alreadyFollowing ? (
                                <GNButton title={"Follow"} onPress={handleFollowing} />
                            ) : (
                                <GNButton title={"Unfollow"} />
                            )}
                        </View>
                        <Divider  color={'lightgray'} width={3}/>
                        <View style={{width: '100%'}}>
                            <PostLoader username={userDB.username}/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
