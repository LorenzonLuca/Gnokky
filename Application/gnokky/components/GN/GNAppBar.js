import { AppBar, HStack, IconButton } from "@react-native-material/core";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Image, Text } from "react-native";
import { COLORS, IMAGES } from "../Models/Globals";


export default function GNAppBar({ title, iconLeading = "", iconTrailing = "chatbubbles-outline", onPressLeading = () => { },
    onPressTrailing = () => { }, iconLeadingColor = COLORS.firtText, iconTrailingColor = COLORS.firtText }) {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: COLORS.background,
        },
        appbar: {
            backgroundColor: COLORS.background,
            color: COLORS.firtText,
            zIndex: 3, // works on ios
            elevation: 3, // works on android
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
    const logo = IMAGES.LOGO;

    const renderTitle = (
        <>
        {title ? (
            <Text>{title}</Text>
        ) : (
            <View style={styles.imageContainer}>
                <Image source={logo} style={styles.image} />
            </View>
        )}
        </>      
    );

    return (
        <View style={styles.container}>
            <AppBar
                title={renderTitle}
                centerTitle={true}
                style={styles.appbar}
                leading={props => (
                    <IconButton
                        icon={props => <Ionicons name={iconLeading} size={30} color={iconLeadingColor} />}
                        onPress={onPressLeading}
                        {...props}
                    />
                )}
                trailing={props => (
                    <IconButton
                        icon={props => <Ionicons name={iconTrailing} size={30} color={iconTrailingColor} />}
                        onPress={onPressTrailing}
                        {...props}
                    />
                )}
            />
        </View>
    );
}


