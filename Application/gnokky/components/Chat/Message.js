import { appUser, COLORS } from "../Models/Globals";
import { View, StyleSheet, Text } from 'react-native';


export default function Message({ message }) {
    const property = message.owner === appUser.username;

    const styles = StyleSheet.create({
        message: {
            maxWidth: '100%',
            padding: 5,
            borderRadius: 20,
            marginVertical: 10,
            alignSelf: property ? 'flex-end' : 'flex-start',
        },
        yourMessage: {
            // alignSelf: 'flex-start',
            backgroundColor: COLORS.elements,
        },
        otherUserMessage: {
            // alignSelf: 'flex-end',
            backgroundColor: COLORS.thirdText,
        },
        messageText: {
            color: property ? COLORS.background : COLORS.firtText,
            padding: 10,
        },
        timeDate: {
            color: property ? COLORS.thirdText : COLORS.firtText,
            paddingHorizontal: 5,
        }
    })

    const transformDate = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes} ${period}`;
    }

    return (
        <>
            <View style={[styles.message, property ? styles.yourMessage : styles.otherUserMessage]}>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.timeDate}>{transformDate(message.timestamp)}</Text>
            </View>
        </>
    )
}