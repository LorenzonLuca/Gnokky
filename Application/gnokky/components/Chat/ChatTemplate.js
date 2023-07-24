import { SafeAreaView, ScrollView, View, StyleSheet, Text, TextInput, FlatList, Dimensions } from "react-native";
import GNButton from '../GN/GNButton';
import { COLORS } from '../Models/Globals';
import { useState, useEffect, useRef, useCallback } from "react";
import GNProfileImage from "../GN/GNProfileImage";
import ChatUtils from "../Models/ChatUtils";
import Message from "./Message";
import FirebaseUtils from "../Models/FirebaseUtils";
import { TouchableWithoutFeedback } from "react-native";
import { useTranslation } from 'react-i18next';
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ChatTemplate({ user, closeChat }) {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [send, setSend] = useState(false);

    const isTextInputValid = message.trim().length === 0;

    const handleOpenProfile = async () => {
        FirebaseUtils.getUserByUsername(user.username)
            .then((user) => {
                navigation.navigate("ProfileSearch", { user: user[0] });
            })
            .catch((error) => {
                console.log("Error while getting username ", error)
            })
    }

    useEffect(() => {
        try {
            ChatUtils.fetchChat(user.chatId, (newValue) => setMessages(newValue))
        } catch (error) {
            console.log("RCAMADONNAA", error);
        }
    }, [])


    const handleWriteMessage = (text) => {
        setMessage(text);
    }

    const handleSendMessage = () => {
        if (message == "" || message == null) {
            return
        }
        ChatUtils.sendMessage(user.chatId, message.trim());
        setMessage("");
        setSend(!send);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
            width: '100%',
        },
        header: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopColor: '#CCCCCC',
            paddingHorizontal: 15,
            borderBottomWidth: 1
        },
        footer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: '#CCCCCC',
            paddingVertical: 8,
            paddingHorizontal: 15,
        },
        body: {
            flex: 1,
            width: '100%',
            paddingHorizontal: 20,
            flexDirection: 'column',
            justifyContent: 'flex-end',
        },
        messageInput: {
            flex: 1,
            marginRight: 8,
            borderWidth: 1,
            borderColor: '#CCCCCC',
            borderRadius: 15,
            padding: 8,
            height: '100%',
        },
    });

    const keyMessage = (item) => {
        return item.owner + item.timestamp;
    }

    const renderMessage = useCallback(({ item }) => (
        <Message message={item} />
    ), []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                    <TouchableWithoutFeedback onPress={closeChat}>
                        <Ionicons name={'arrow-back'} size={30} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            handleOpenProfile()
                            closeChat()
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
                            <View style={{ padding: 10 }}>
                                <GNProfileImage selectedImage={user.profilePic} size={45} />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{user.username}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={messages}
                    keyExtractor={keyMessage}
                    inverted={true}
                    renderItem={renderMessage}
                    initialNumToRender={3}
                    removeClippedSubviews={true}
                />
            </View>
            <View style={styles.footer}>
                <TextInput
                    style={styles.messageInput}
                    placeholder={t('message')}
                    value={message}
                    onChangeText={handleWriteMessage}
                    multiline={true}
                />
                <GNButton
                    title={t('send')}
                    backgroundColor={isTextInputValid ? COLORS.thirdText : COLORS.elements}
                    isDisabled={isTextInputValid}
                    width={'15%'}
                    onPress={handleSendMessage} />

            </View>
        </SafeAreaView>
    );
}