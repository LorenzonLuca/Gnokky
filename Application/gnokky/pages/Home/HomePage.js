import { View, Text, TextInput, Pressable } from 'react-native';

import homestyle from "../../styles/Home";

import Ionicons from '@expo/vector-icons/Ionicons';
import GNHeader from '../../components/GNHeader';
import GNAppBar from '../../components/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';


export default function HomePage({ navigation }) {

    const messageClick = () => {
        navigation.navigate("Chat")
    }

    return (
        <SafeAreaView style={homestyle.background}>
            <View style={homestyle.container}>
            
            </View>
        </SafeAreaView>
    );
}