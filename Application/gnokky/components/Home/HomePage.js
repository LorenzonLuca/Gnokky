import { View, Text, TextInput, Pressable } from 'react-native';

import homestyle from "../../styles/Home";

import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';
import MainLayout from './MainLayout';

import { appUser } from '../../components/Models/Globals';


export default function HomePage({ navigation }) {
    appUser.getValueAndUpdate();

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