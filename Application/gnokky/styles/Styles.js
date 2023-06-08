import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        backgroundColor: '#25292e',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 65,
        margin: 35,
    },
    title2: {
        color: '#fff',
        fontSize: 35,
        margin: 20,
    },
    paragraph: {
        color: '#fff',
        fontSize: 25,
        margin: 20,
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
