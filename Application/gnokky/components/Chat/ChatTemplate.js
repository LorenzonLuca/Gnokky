import { SafeAreaView, ScrollView, View, StyleSheet, Text, TextInput } from "react-native";
import GNButton from '../GN/GNButton';
import { COLORS, appUser } from '../Models/Globals';
import { useState, useEffect } from "react";
import GNProfileImage from "../GN/GNProfileImage";

export default function ChatTemplate({ navigation, route }) {
    const { user } = route.params;
    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOO", user);
    const [message, setMessage] = useState("");

    const isTextInputValid = message.trim().length === 0;

    const renderTitle = () => {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ padding: 10 }}>
                    <GNProfileImage selectedImage={user.profilePic} size={35} />
                </View>
                <Text style={{fontWeight: 'bold'}}>{user.username}</Text>
            </View>
        )
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: renderTitle, // Mostra i dati nell'intestazione
          });
          
    }, [navigation, user]);


    const handleWriteMessage = (text) => {
        setMessage(text);
    }

    const handleSendMessage = () => {

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
            padding: 20,
        },
        messageInput: {
            flex: 1,
            marginRight: 8,
            borderWidth: 1,
            borderColor: '#CCCCCC',
            borderRadius: 15,
            padding: 8,
            height: '100%',
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.body}>
                    <Text>Coddio</Text>
                </View>
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
            </ScrollView>
        </SafeAreaView>
    );
}