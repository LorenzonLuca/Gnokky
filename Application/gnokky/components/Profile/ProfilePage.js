import { View, StyleSheet, ScrollView, SafeAreaView, RefreshControl, ActivityIndicator, TouchableWithoutFeedback, Text } from 'react-native';
import Divider from '../GN/Divider';
import PostLoader from '../Post/PostLoader';
import ProfileData from './ProfileData';
import { useState } from 'react';
import FirebaseUtils from '../Models/FirebaseUtils';
import { useEffect, useRef } from 'react';
import { appUser, COLORS } from '../Models/Globals';
import { IconButton } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ROUTES } from '../Models/Globals';
import GNBottomSheetModal from '../GN/GNBottomSheetModal';
import { useTranslation } from 'react-i18next';
import ContactList from '../GN/ContactList';
import ChatUtils from '../Models/ChatUtils';

export default function ProfilePage({ navigation, route }) {
    const { user } = route.params;
    const { t } = useTranslation();
    const [property, setProperty] = useState(user.id === appUser.id);
    const [profileUser, setProfileUser] = useState(user);
    const [refreshing, setRefreshing] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true); // Stato di caricamento iniziale

    ///// bottomSheet modal /////
    const bottomSheetOptionModalRef = useRef(null);
    const bottomSheetReportsModalRef = useRef(null);

    const handlePresentOptionModal = () => {
        bottomSheetOptionModalRef.current?.present();
    }

    const handleDismissOptionModal = () => {
        bottomSheetOptionModalRef.current?.dismiss();
    }

    const bottomSheetOptionModalRefShare = useRef(null);

    const handlePresentOptionModalShare = () => {
        bottomSheetOptionModalRefShare.current?.present();
    }

    //////////

    const onRefresh = async () => {
        setRefreshing(true);
        setRefresh(true);
        try {
            let newUser;
            if (property) {
                newUser = await FirebaseUtils.getUser(appUser.id);
            } else {
                console.log("CEO DELLA CIOLA ", profileUser);
                newUser = await FirebaseUtils.getUser(user.id);
            }

            setProfileUser(newUser);
        } catch (error) {
            console.log("Error during data refresh: ", error);
        }
        setRefreshing(false);
        setRefresh(false);
    };

    const renderMyRightHeader = () => {
        return (
            <IconButton
                icon={() => <Ionicons name={'settings-outline'} size={30} color={'black'} />}
                onPress={() => navigation.navigate(ROUTES.SETTINGS)}
            />
        )
    }

    const renderProfileRightHeader = () => {
        return (
            <IconButton
                icon={() => <Ionicons name={'ellipsis-vertical-sharp'} size={25} color={COLORS.secondText} />}
                onPress={handlePresentOptionModal}
            />
        )
    }

    useEffect(() => {
        if (property) {
            navigation.setOptions({
                headerTitle: user.username,
                headerRight: renderMyRightHeader, // Mostra i dati nell'intestazione
            });
        } else {
            navigation.setOptions({
                headerTitle: user.username,
                headerRight: renderProfileRightHeader, // Mostra i dati nell'intestazione
            });
        }

    }, [navigation, user]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await FirebaseUtils.getUser(profileUser?.id);
                console.log("MATERAZZI è CADUTO ", fetchedUser);
                setProfileUser(fetchedUser);
                setLoading(false);
            } catch (error) {
                console.log("possible unhandled madonna troia 2 ", error);
                setLoading(false);
            }
        };
        fetchUser()
    }, []);

    const handleShareProfile = async (user) => {
        const chat = await ChatUtils.findChatByUsername(user);

        await ChatUtils.sendProfile(chat, profileUser.id);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        contentContainer: {
            flexGrow: 1,
            justifyContent: 'center',
        },
        body: {
            flex: 1,
            //justifyContent: 'center',
            alignItems: 'center',
        },
        bottomSheetSubtitle: {
            fontWeight: "bold",
            color: COLORS.firtText,
            fontSize: 14,
        },
        bottomSheetRow: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-start',
            marginVertical: 5,
        },
        shareBottomSheet: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: 3
        }
    });

    if (loading) {
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                onScrollEndDrag={() => { }}>
                <View style={styles.body}>
                    <ActivityIndicator size="large" color={COLORS.elements} />
                </View>
            </ScrollView>
        );
    }

    if (profileUser) {
        return (
            <>
                <SafeAreaView style={styles.container}>
                    <ScrollView contentContainerStyle={styles.contentContainer}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }>
                        <View style={styles.body}>
                            <ProfileData user={profileUser} property={property} />
                            <Divider color={'lightgray'} width={3} />
                            <View style={{ width: '100%' }}>
                                <PostLoader username={profileUser.username} refresh={refresh} />
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <GNBottomSheetModal modalRef={bottomSheetOptionModalRef} >
                    <TouchableWithoutFeedback onPress={() => { console.log("SIUMRIMUOVI") }} >
                        <View style={[styles.bottomSheetRow]}>
                            <Ionicons name="person-remove-outline" size={30} color={COLORS.firtText} />
                            <Text style={styles.bottomSheetSubtitle}>    {t('stop-following')}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Divider color={COLORS.thirdText} />
                    <TouchableWithoutFeedback onPress={() => {
                        handlePresentOptionModalShare()
                        handleDismissOptionModal()
                    }} >
                        <View style={[styles.bottomSheetRow]}>
                            <Ionicons name="paper-plane-outline" size={30} color={COLORS.firtText} />
                            <Text style={styles.bottomSheetSubtitle}>    {t('share-profile')}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Divider color={COLORS.thirdText} />
                </GNBottomSheetModal>
                <GNBottomSheetModal modalRef={bottomSheetOptionModalRefShare} height={['50%']} title={"Share profile with someone"}>
                    <View style={[styles.shareBottomSheet, { width: '100%' }]}>
                        <ScrollView>
                            <ContactList
                                usernames={appUser.following}
                                iconName={'paper-plane'}
                                contactOnPress={(username) => {
                                    console.log("Sending this profile to ", username);
                                    handleShareProfile(username)
                                }}
                                clickOpenProfile={false}
                                size={50}
                            />
                        </ScrollView>
                    </View>
                </GNBottomSheetModal>
            </>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.contentContainer}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onScrollEndDrag={() => { }}>
            <View style={styles.warningBody}>
                <Text>Cannot load profile, try again later</Text>
            </View>
        </ScrollView>
    );
}
