import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function Button({ text, onPress, backgroundColor = null, color = "#fff", borderColor = "#fff", style }) {
    const styles = StyleSheet.create({
        buttonContainer: {
            width: 200,
            height: 40,
            margin: 5,
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            borderWidth: 4,
            borderColor: borderColor,
            borderRadius: 18
        },
        button: {
            borderRadius: 10,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: backgroundColor,
        },
        buttonLabel: {
            color: color,
            fontSize: 16,
        },
    })

    return (
        <View style={[styles.buttonContainer, style]}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}