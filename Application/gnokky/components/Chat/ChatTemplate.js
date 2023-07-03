import { SafeAreaView, ScrollView, View, StyleSheet, Text, TextInput } from "react-native";
import GNButton from '../GN/GNButton';
import { COLORS } from '../Models/Globals';
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import GNProfileImage from "../GN/GNProfileImage";
import ChatUtils from "../Models/ChatUtils";
import Message from "./Message";
import FirebaseUtils from "../Models/FirebaseUtils";
import { TouchableWithoutFeedback } from "react-native";


export default function ChatTemplate({ navigation, route }) {
    const { user } = route.params;

    const scrollViewRef = useRef(null);

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

    const renderTitle = () => {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={handleOpenProfile}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ padding: 10 }}>
                        <GNProfileImage selectedImage={user.profilePic} size={35} />
                    </View>
                    <Text style={{ fontWeight: 'bold' }}>{user.username}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: renderTitle, // Mostra i dati nell'intestazione
        });

    }, [navigation, user]);

    useEffect(() => {
        try {
            ChatUtils.fetchChat(user.chatId, (newValue) => setMessages(newValue))
        } catch (error) {
            console.log("RCAMADONNAA", error);
        }
    }, [])

    useLayoutEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
            // Execute your logic here after the generateMessages array has finished rendering
            console.log('Messages rendered:', messages);
        }
    }, [messages]);


    const handleWriteMessage = (text) => {
        setMessage(text);
    }

    const handleSendMessage = () => {
        if (message == "" || message == null) {
            return
        }
        ChatUtils.sendMessage(user.chatId, message.trim());
        scrollViewRef.current.scrollToEnd({ animated: true });
        setMessage("");
        setSend(!send);
    }

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
            paddingVertical: 25,
        },
        footer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: '#CCCCCC',
            paddingVertical: 8,
        },
        body: {
            flex: 1,
            width: '100%',
            padding: 20,
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
        messageBody: {
            flexDirection: 'column',
        }
    });

    const generateMessages = messages.map((mess) => (
        <Message message={mess} key={mess.owner + mess.timestamp} />
    ))

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} ref={scrollViewRef}>
                <View style={styles.body}>
                    <View style={styles.messageBody}>
                        {generateMessages}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Write message"
                    value={message}
                    onChangeText={handleWriteMessage}
                    multiline={true}
                />
                <GNButton
                    title={'SEND'}
                    backgroundColor={isTextInputValid ? COLORS.thirdText : COLORS.elements}
                    isDisabled={isTextInputValid}
                    width={'15%'}
                    onPress={handleSendMessage} />

            </View>
        </SafeAreaView>
    );
}