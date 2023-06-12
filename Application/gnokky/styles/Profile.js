import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
    },
    background: {
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        width: '100%',
        padding: 10,
        color: '#fff'
    },
    bioContainer: {
        backgroundColor: '#25292e',
        margin: 20,
        marginTop: 0,
    },
});

export default profileStyles;