import { StyleSheet, View, Text, Image } from "react-native";

export default function GNProfileImage({ placeholder, size = 100, selectedImage }) {
    const imageSource = selectedImage !== null
        ? { uri: selectedImage }
        : placeholderImageSource;

    const styles = StyleSheet.create({
        imageContainer: {
            width: size,
            height: size,
            borderRadius: size / 2,
            overflow: 'hidden',
            borderColor: '#fff',
            borderWidth: 5,
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