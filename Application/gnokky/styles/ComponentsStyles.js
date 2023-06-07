import { StyleSheet } from "react-native";

const ComponentsStyles = StyleSheet.create({
    button: {
        buttonContainer: {
            width: 200,
            height: 40,
            margin: 5,
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            borderWidth: 4,
            borderColor: "#fff",
            borderRadius: 18
        },
        button: {
            borderRadius: 10,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        buttonLabel: {
            color: "#fff",
            fontSize: 16,
        },
    }
});

export default ComponentsStyles;