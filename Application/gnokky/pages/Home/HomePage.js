import { View, Text, TextInput, Pressable } from 'react-native';

import homestyle from "../../styles/Home";

import Ionicons from '@expo/vector-icons/Ionicons';
import GNHeader from '../../components/GNHeader';
import GNAppBar from '../../components/AppBar';



export default function HomePage({ navigation }) {

    const messageClick = () => {
        navigation.navigate("Chat")
    }

    return (
        <View style={homestyle.background}>
            <GNAppBar/>
            <GNHeader title={"Gnokky"} iconName={"paper-plane"} iconOnPress={messageClick} />
            <View style={homestyle.container}>

            </View>
        </View>
    );
}