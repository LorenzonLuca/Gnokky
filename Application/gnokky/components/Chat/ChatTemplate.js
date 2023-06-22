import { SafeAreaView, ScrollView, View, StyleSheet, Text } from "react-native";
import { COLORS, appUser } from '../Models/Globals';


export default function ChatTemplate() {

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
                    <Text>Coddio</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}