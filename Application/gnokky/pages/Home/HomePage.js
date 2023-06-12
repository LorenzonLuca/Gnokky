import { View, Text, TextInput, Pressable } from 'react-native';

import homestyle from "../../styles/Home";

import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';
import MainLayout from './MainLayout';

import FirebaseUtils from '../../Models/FirebaseUtils';
import { storage } from '../../Models/Firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { appUser } from '../../Models/Globals';


export default function HomePage({ navigation }) {

    FirebaseUtils.getUser(appUser.id).then((result) => {
        appUser.setUsername(result.username);
        appUser.setName(result.name);
        appUser.setSurname(result.surname);
        appUser.setBio(result.bio);
        appUser.setFollowers(result.followers);
        appUser.setFollowing(result.following);
        appUser.setPosts(result.posts);
        const fileName = result.username + ".jpg";
        const storageRef = ref(storage, `profilespic/${fileName}`);

        getDownloadURL(storageRef)
            .then((downloadUrl) => {
                appUser.setProfilePic(downloadUrl);
            })
            .catch((error) => {
                console.log("Error getting download URL:", error);
            });
    });


    const messageClick = () => {
        navigation.navigate("Chat")
    }

    return (
        <SafeAreaView style={homestyle.background}>
            <View style={homestyle.container}>

            </View>
        </SafeAreaView>
        // <MainLayout>
        //     <View>
        //         <Text>Contenuto della pagina Home</Text>
        //     </View>
        // </MainLayout>
    );
}