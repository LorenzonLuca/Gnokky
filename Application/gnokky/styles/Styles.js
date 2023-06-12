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
        // backgroundColor: '#182638',
    },
    // roundedContainer: {
    //     borderTopLeftRadius: 25,
    //     borderTopRightRadius: 25,
    // },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        color: '#F8D154',
        fontSize: 65,
        marginBottom: 55,
        textAlign: 'center',
        fontFamily: 'mnst-bold'
    },
    title2: {
        color: '#fff',
        fontSize: 35,
        margin: 20,
    },
    title3: {
        color: '#F8D154',
        fontSize: 25,
        marginTop: 20,
        textAlign: 'center',
        fontFamily: 'mnst-bold'
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
    },
});

export default styles;
