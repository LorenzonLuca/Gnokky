import { StyleSheet, Text } from "react-native";
import { COLORS } from "../Models/Globals";

export default function GNText({ children, color = COLORS.firtText, fontSize = 15 }) {


    const styles = StyleSheet.create({
        text: {
            color: color,
            fontSize: fontSize,
        }
    });

    return (
        <Text numberOfLines={1} style={styles.text}>{children}</Text>
    );
}