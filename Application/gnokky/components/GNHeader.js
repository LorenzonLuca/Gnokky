import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function GNHeader({ title, color = '#fff', iconName = null, iconOnPress }) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#182638',
            alignItems: 'center',
            justifyContent: 'center',
            height: 75,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            zIndex: 3, // works on ios
            elevation: 3, // works on android
        },
        title: {
            color: color,
            fontSize: 20,
        },
        icon: {
            marginRight: 8,
        },
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
    });

    if (iconName != null) {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <View>
                        <TouchableWithoutFeedback onPress={iconOnPress} >
                            <Ionicons name={iconName} size={24} color={color} style={styles.icon} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View >
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}