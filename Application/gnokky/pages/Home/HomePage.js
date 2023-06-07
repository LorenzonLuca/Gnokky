import { View, Text, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import homestyle from "../../styles/Home";

import Ionicons from '@expo/vector-icons/Ionicons';
import NavigatorTab from '../../components/NavigatorTab';



export default function HomePage({ navigation }) {
    return (
        /*<View style={homestyle.container}>
            <Text>Ciao</Text>
            <Ionicons name="search-circle" size={50} />
        </View>*/
        <NavigationContainer>
            <NavigatorTab />
        </NavigationContainer>
    );
}