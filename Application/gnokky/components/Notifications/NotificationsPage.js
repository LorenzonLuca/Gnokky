import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { COLORS, ROUTES, appUser } from '../Models/Globals';
import NotificationUtils from '../Models/NotificationUtils';
import Notifications from './Notifications';


export default function NotificationsPage({ navigation }) {
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const not = await NotificationUtils.fetchNotification();
                console.log("fetched notifications ", not);
                setNotifications(not);
            } catch (error) {
                console.log("Error while fetching notification ", error);
            }
        }

        fetchNotification();
    }, [navigation])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        contentContainer: {
            flexGrow: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
        },
        header: {
        },
        body: {
            // flex: 1,
            padding: 20,
        },
    });


    if (notifications) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.body}>
                        {notifications.length > 0 ? (
                            <Notifications elements={notifications} navigation={navigation} />
                        ) : (
                            <Text>There aren't notification</Text>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.body}>
                        <ActivityIndicator size={'large'} color={COLORS.elements} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

}