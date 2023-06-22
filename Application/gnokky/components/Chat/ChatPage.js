import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { COLORS, appUser } from '../Models/Globals';

import homestyle from "../../styles/Home";

import Ionicons from '@expo/vector-icons/Ionicons';



export default function ChatPage({ navigation }) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        contentContainer: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        header: {
        },
        body: {
            // flex: 1,
            padding: 20,
        },
    });


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.body}>
                    <Text>Diocane</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}