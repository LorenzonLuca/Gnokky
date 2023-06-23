import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Divider from "../GN/Divider";
import GNProfileImage from "../GN/GNProfileImage";
import ChatUtils from "../Models/ChatUtils";
import { COLORS } from "../Models/Globals";


export default function ListResearchChat({ existingChats = [], otherUsers = [], refresh, navigation }) {


    const styles = StyleSheet.create({
        contentContainer: {
            flexGrow: 1,
            width: '100%'
        },
        body: {
            flex: 1,
            padding: 20,
            // borderColor: '#000',
            // borderWidth: 1,
            textAlign: 'left',
        },
        userLabel: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            backgroundColor: COLORS.fourthText,
            padding: 2,
            borderRadius: 10,
        },
        username: {
            marginHorizontal: 10,
        }
    })

    const generateExistingChats = existingChats.map(chat => (
        <TouchableWithoutFeedback key={chat.id} onPress={() => openChat(chat)}>
            <View style={styles.userLabel}>
                <GNProfileImage selectedImage={chat.profilePic} size={40} />
                <Text style={styles.username}>{chat.username}</Text>
            </View>
        </TouchableWithoutFeedback>
    ));

    const generateOtherUsers = otherUsers.map(user => (
        <TouchableWithoutFeedback key={user.id} onPress={() => createChat(user)}>
            <View style={styles.userLabel}>
                <GNProfileImage selectedImage={user.profilePic} size={40} />
                <Text style={styles.username}>{user.username}</Text>
            </View>
        </TouchableWithoutFeedback>
    ));

    const createChat = (user) => {
        ChatUtils.createChat(user.username, user.id);
        refresh();
        openChat(user);
    }

    const openChat = (user) => {
        navigation.navigate("TemplateChat", { user: user });
    }

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.body}>
                <Text>Existing chats</Text>
                <Divider />
                {generateExistingChats}
                <Text>Other users</Text>
                <Divider />
                {generateOtherUsers}
            </View>
        </ScrollView>
    );
}