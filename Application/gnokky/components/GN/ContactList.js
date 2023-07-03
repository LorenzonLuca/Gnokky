import { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import FirebaseUtils from '../Models/FirebaseUtils';
import Divider from './Divider';
import GNProfileImage from './GNProfileImage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Models/Globals';


export default function ContactList({ usernames, size = 60, iconName = '', iconOnPress, iconColor = '#000',
    contactOnPress = () => { }, clickOpenProfile = true, filterIcon, filterUser,
    backgroundColor = COLORS.background, divider = true }) {
    const [profilePics, setProfilePics] = useState([]);
    const [filteredUsernames, setFilteredUsernames] = useState([]);
    const [filteredPics, setFilteredPics] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        console.log("IL PORCODDIDIODODOD");
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

    useEffect(() => {
        if (filterUser) {
            if (filterUser !== "") {
                var indexs = [];
                const filteredValues = usernames.filter((str, index) => {
                    const filtered = str.toLowerCase().indexOf(filterUser.toLowerCase()) >= 0;
                    if (filtered) {
                        indexs.push(index);
                    }
                    return filtered;
                });
                let filteredProfiles = [];
                for (let i = 0; i < indexs.length; i++) {
                    filteredProfiles.push(profilePics[indexs[i]]);
                }
                setFilteredUsernames(filteredValues);
                setFilteredPics(filteredProfiles);
            }
        } else {
            setFilteredUsernames([]);
            setFilteredPics([]);
        }
    }, [filterUser])

    const handleContactOnPress = (username) => {
        contactOnPress(username);
        handleOpenProfile(username);
    }

    const handleOpenProfile = async (username) => {
        if (clickOpenProfile) {
            const user = await FirebaseUtils.getUserByUsername(username);

            console.log("AAAAAAAAAAAAAAAAAAA", user);

            navigation.navigate("ProfileSearch", { user: user[0] })
        }
    }

    const handleFilterIcon = (username) => {
        if (filterIcon) {
            return filterIcon(username)
        }
        return true;
    }

    const styles = StyleSheet.create({
        fullContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: backgroundColor,
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
        iconAndName: {
            flexDirection: 'row',
            alignItems: 'center'
        }
    });

    return (filteredUsernames.length > 0 ? filteredUsernames : usernames).map((user, index) => (
        <View key={user} style={styles.fullContainer}>
            <TouchableWithoutFeedback onPress={() => {
                handleContactOnPress(user);
            }}>
                <View style={styles.userElements}>
                    <View style={styles.iconAndName}>
                        <GNProfileImage
                            selectedImage={filteredPics.length > 0 ? filteredPics[index] : profilePics[index]}
                            size={size}
                        />
                        <Text style={styles.usernameLabel}>{user}</Text>
                    </View>
                    {handleFilterIcon(user) && (
                        <TouchableWithoutFeedback
                            onPress={
                                iconOnPress != null ? iconOnPress : () => {
                                    handleContactOnPress(user);
                                }}>
                            <Ionicons name={iconName} style={styles.iconRight} size={size / 2} color={iconColor} />
                        </TouchableWithoutFeedback>
                    )}
                </View>
            </TouchableWithoutFeedback >
            {divider && (
                <Divider />
            )}
        </View >
    ));
}