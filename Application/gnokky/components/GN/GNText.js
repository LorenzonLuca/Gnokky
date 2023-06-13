import { StyleSheet, Text } from "react-native";

export default function GNText({ children, color = '#fff', fontSize = 15 }) {
    const styles = StyleSheet.create({
        text: {
            color: color,
            fontSize: fontSize,
        }
    });

    return (
        <Text style={styles.text}>{children}</Text>
    );
}