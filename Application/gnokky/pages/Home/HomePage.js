import { View, Text, TextInput, Pressable } from 'react-native';

import homestyle from "../../styles/Home";

import Ionicons from '@expo/vector-icons/Ionicons';



export default function HomePage({ navigation }) {
    return (
        <View style={homestyle.container}>
            <Text>Home Page</Text>
        </View>
    );
}