import { View, StyleSheet, ScrollView, SafeAreaView, RefreshControl, ActivityIndicator, Text } from 'react-native';
import Divider from '../GN/Divider';
import PostLoader from '../GN/PostLoader';
import ProfileData from './ProfileData';
import { useState } from 'react';
import FirebaseUtils from '../Models/FirebaseUtils';
import { useEffect } from 'react';
import { appUser, COLORS } from '../Models/Globals';

export default function ProfilePage({ navigation, route }) {
    const { user } = route.params;
    console.log("MI CIOLO MA IN PROFILE PAGE", user);
    const [property, setProperty] = useState(user.id === appUser.id);
    const [profileUser, setProfileUser] = useState(user);
    const [refreshing, setRefreshing] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true); // Stato di caricamento iniziale

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
            console.log(error);
        }

        setRefreshing(false);
        setRefresh(false);
    };

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const fetchedUser = await FirebaseUtils.getUser(profileUser.id)
                console.log("MATERAZZI è CADUTO ", fetchedUser);
                setProfileUser(fetchedUser);
                setLoading(false); // Imposta lo stato di caricamento su false quando i dati sono stati caricati
            } catch (error) {
                console.log(error);
                setLoading(false); // Gestisci l'errore e imposta lo stato di caricamento su false
            }
        }
        fetchUser();
    }, [])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            //backgroundColor: COLORS.background,
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
