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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#fff',
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
