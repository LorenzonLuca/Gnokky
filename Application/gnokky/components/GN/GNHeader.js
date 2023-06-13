import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";

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
            justifyContent: 'space-between',
            alignItems: 'center',
            alignItems: 'center',
            paddingHorizontal: 16,
            width: '100%',
        },
    });

    if (iconName != null) {
        return (
            <SafeAreaView>
                <Appbar.Header style={styles.container}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableWithoutFeedback onPress={iconOnPress}>
                            <Ionicons name={iconName} size={24} color={color} style={styles.icon} />
                        </TouchableWithoutFeedback>
                    </View>
                </Appbar.Header >
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView>
            <Appbar.Header style={styles.container}>
                <Text style={styles.title}>{title}</Text>
            </Appbar.Header >
        </SafeAreaView>
    );
}