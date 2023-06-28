import { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, Image, TouchableWithoutFeedback,
    ImageBackground, TouchableOpacity, Modal, Dimensions, ScrollView,
    KeyboardAvoidingView, TextInput
} from 'react-native';
import FirebaseUtils from '../Models/FirebaseUtils';
import Divider from './Divider';
import GNProfileImage from './GNProfileImage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../Models/Globals';


export default function ContactList({ usernames, size = 60, iconName = 'heart', iconOnPress = () => { }, iconColor = '#000',
    contactOnPress = () => { }, clickOpenProfile = true }) {
    const [profilePics, setProfilePics] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProfilePics = async () => {
            try {
                const profilePicsArray = [];

                for (const username of usernames) {
                    const pic = await FirebaseUtils.getProfilePicFromUsername(username);
                    profilePicsArray.push(pic);
                }

                setProfilePics(profilePicsArray);
            } catch (error) {
                console.log("Error while fetching profile pics in ContactList:", error);
            }
        };

        fetchProfilePics();
    }, [usernames])

    const handleOpenProfile = async (username) => {
        if (clickOpenProfile) {
            const user = await FirebaseUtils.getUserByUsername(username);

            console.log("AAAAAAAAAAAAAAAAAAA", user);

            navigation.navigate(ROUTES.PROFILE, { user: user })
        }
    }

    const styles = StyleSheet.create({
        fullContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
        },
        userElements: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        usernameLabel: {
            fontSize: size / 3,
            marginHorizontal: 10,
        },
        iconRight: {
            alignSelf: 'center',
        },
    });

    return usernames.map((user, index) => (
        <View key={user} style={styles.fullContainer}>
            <TouchableWithoutFeedback onPress={() => {
                contactOnPress();
                handleOpenProfile(user);
            }}>
                <View style={styles.userElements}>
                    <GNProfileImage selectedImage={profilePics[index]} size={size} />
                    <Text style={styles.usernameLabel}>{user}</Text>
                    <TouchableWithoutFeedback onPress={iconOnPress}>
                        <Ionicons name={iconName} style={styles.iconRight} size={size / 2} color={iconColor} />
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
            <Divider />
        </View>
    ));
}