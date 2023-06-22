import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal } from 'react-native';
import GNProfileImage from '../GN/GNProfileImage';
import { appUser } from '../Models/Globals';
import { COLORS } from '../Models/Globals';
import { useEffect, useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native-elements';
import * as VideoPicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import FirebaseUtils from '../Models/FirebaseUtils';



export default function Comment( { comment } ){

    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const fetchedProfilePic = await FirebaseUtils.getProfilePicFromUsername(comment.owner);
                console.log("maremma cariola ", fetchedProfilePic);
                setProfilePic(fetchedProfilePic);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfilePic();
    }, []);

    
    const styles = StyleSheet.create({
        itemContainer: {
            padding: 6,
            margin: 6,
            backgroundColor: "#eee",
            width: '100%',
        },
    });

    return (
        <View style={styles.itemContainer}>
            <View style={{ padding: 10 }}>
                <GNProfileImage selectedImage={profilePic} size={50} />
            </View>
            <Text>{comment.text}</Text>
        </View>
    );
}