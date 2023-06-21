import { StyleSheet, View, Text, Image } from "react-native";
import { Avatar } from 'react-native-elements';

export default function GNProfileImage({ placeholder, size = 100, selectedImage, borderSize = 0, borderColor = '#000' }) {
    const imageSource = selectedImage !== null
        ? { uri: selectedImage }
        : placeholder;

    const styles = StyleSheet.create({
        imageContainer: {
            width: size,
            height: size,
            borderRadius: size / 2,
            overflow: 'hidden',
            borderSize: borderSize,
            borderColor: borderColor,
        },
        image: {
            flex: 1,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        }
    })
    return (
        <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.image}></Image>
        </View>
    );
}