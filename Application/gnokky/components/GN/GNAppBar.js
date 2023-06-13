import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Image, Text } from "react-native";
export default function GNAppBar({ iconLeading = "", iconTrailing = "paper-plane", onPressLeading = () => { }, onPressTrailing = () => { } }) {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#25292e",
        },
        appbar: {
            backgroundColor: "#FFF",
            color: "#000",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            zIndex: 3, // works on ios
            elevation: 3, // works on android
            // borderRadius: 15,
            // marginTop: 10,
            // marginLeft: 20,
            // marginRight: 20,
        },
        imageContainer: {
            width: 50,
            height: 50,
            overflow: 'hidden',
            marginHorizontal: 10
        },
        image: {
            flex: 1,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        }
    });
    const logo = require('./../../assets/logo/logo_gnocchi_outline.png');

    const title = (
        <View style={styles.imageContainer}>
            <Image source={logo} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.container}>
            <AppBar
                title={title}
                centerTitle={true}
                style={styles.appbar}
                leading={props => (
                    <IconButton
                        icon={props => <Ionicons name={iconLeading} size={30} color={"#000"} />}
                        onPress={onPressLeading}
                        {...props}
                    />
                )}
                trailing={props => (
                    <IconButton
                        icon={props => <Ionicons name={iconTrailing} size={24} color={"#000"} />}
                        onPress={onPressTrailing}
                        {...props}
                    />
                )}
            />
        </View>
    );
}


