import { View, Text, TextInput, Pressable } from 'react-native';
import homestyle from "../../styles/Home";

import Ionicons from '@expo/vector-icons/Ionicons';
import GNTextInput from '../GN/GNTextInput';
import FirebaseUtils from '../Models/FirebaseUtils';
import { useEffect, useState } from 'react';
import ListUsers from './ListUsers';



export default function SearchPage({ navigation }) {
    const [research, setResearch] = useState("");
    const [listUsers, setListUsers] = useState([]);


    useEffect(() => {
        if (research !== "") {
            const lowerResearch = research.toLowerCase();
            FirebaseUtils.findUserFromSearchBar(lowerResearch)
                .then((result) => {
                    setListUsers(result);
                })
        } else {
            setListUsers([]);
        }
    }, [research])

    const handleResearch = (inputText) => {
        setResearch(inputText);
    }

    return (
        <View style={homestyle.container}>
            <GNTextInput
                placeholder="Search"
                iconName="search-outline"
                iconNameFocused="search-sharp"
                onChangeText={handleResearch}
                animation={true} />
            <ListUsers users={listUsers} navigation={navigation} />
        </View>
    );
}