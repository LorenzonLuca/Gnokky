import { StyleSheet, View, Text } from "react-native";

export default function GNHeader({ title, color = '#fff' }) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#182638',
            alignItems: 'center',
            justifyContent: 'center',
            height: 75,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
        },
        title: {
            color: color,
            fontSize: 20,
        }
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}