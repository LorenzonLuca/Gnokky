import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';

import styless from '../../styles/Styles'

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#25292e',
        },
        contentContainer: {
            flexGrow: 1,
            justifyContent: 'center',
        },
        header: {
        },
        headerText: {
            fontSize: 20,
            textAlign: 'center',
            color: '#F8D154',
            fontSize: 45,
            fontFamily: 'mnst-bold'
        },
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 30,
        },
        body: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        bodyText: {
            fontSize: 16,
        },

    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <GNAppBar title='Gnokky' />
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.body}>
                    <GNTextInput
                        placeholder="Search"
                        iconName="search-outline"
                        iconNameFocused="search-sharp"
                        onChangeText={handleResearch}
                        animation={true} />
                    <ListUsers users={listUsers} navigation={navigation} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}