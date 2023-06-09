import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export default function GNAppBar({title}) {
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#25292e",
        },
        appbar: { 
            backgroundColor: "#FFF",
            color: "#000",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            // borderRadius: 15,
            // marginTop: 10,
            // marginLeft: 20,
            // marginRight: 20,
        },
        title: {
            color: "#000",
        }
    });

    return (
        <View style={styles.container}>
            <AppBar
                title={title}
                titleStyle={styles.title}
                centerTitle={true}
                style={styles.appbar}
                leading={props => (
                    <IconButton
                        icon={props =><Ionicons name={""} size={24} color={"#000"} />}
                        {...props}
                    />
                )}
                trailing={props => (
                    <IconButton
                        icon={props =><Ionicons name={"paper-plane"} size={24} color={"#000"} />}
                        {...props}
                    />
                )}
            />
        </View>
    );
}


