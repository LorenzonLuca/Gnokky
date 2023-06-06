import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 65,
        margin: 35,
    },
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
    },
    textInputStyle: {
        fontSize: 25,
        height: 40,
        width: 250,
        backgroundColor: '#fff',
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        margin: 10,
        padding: 5,
        textAlign: 'center',
    }
});

export default styles;
