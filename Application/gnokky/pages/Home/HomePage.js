import { View, Text, TextInput, Pressable } from 'react-native';

import homestyle from "../../styles/Home";

import Ionicons from '@expo/vector-icons/Ionicons';
import GNHeader from '../../components/GNHeader';
import GNAppBar from '../../components/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomePage({ navigation }) {

    const messageClick = () => {
        navigation.navigate("Chat")
    }

    return (
        <SafeAreaView style={homestyle.background}>
            <GNAppBar title="Gnokky"/>
            {/* <GNHeader title={"Gnokky"} iconName={"paper-plane"} iconOnPress={messageClick} /> */}
            <View style={homestyle.container}>

            </View>
        </SafeAreaView>
    );
}