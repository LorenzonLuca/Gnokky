import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        backgroundColor: '#7b838c',
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        width: '100%',
        padding: 10,
    },
    bioContainer: {
        backgroundColor: '#7b838c',
        margin: 20,
        marginTop: 0,
    }
});

export default profileStyles;