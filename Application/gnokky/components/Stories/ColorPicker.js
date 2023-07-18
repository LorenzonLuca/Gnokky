import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { COLORS } from '../Models/Globals';

export default function ColorPicker({ setColor }) {
    const COLORS_PICKER = [
        '#FF0000', // Rosso
        '#00FF00', // Verde
        '#0000FF', // Blu
        '#FFFF00', // Giallo
        '#FF00FF', // Magenta
        '#00FFFF', // Ciano
        '#000000', // Nero
        '#FFFFFF', // Bianco
        '#800080', // Viola
        '#FFA500', // Arancione
        '#008000', // Verde scuro
        '#FFC0CB', // Rosa
        '#00CED1', // Azzurro
        '#FF4500', // Arancione scuro
        '#FF1493', // Rosa acceso
        '#7CFC00', // Verde brillante
    ];

    const size = 30;

    const styles = StyleSheet.create({
        icons: {
            borderColor: '#000',
            borderWidth: 1,
            width: size,
            borderRadius: size / 2,
            height: size,
            margin: 7
        },
        container: {
            borderColor: COLORS.thirdText,
            backgroundColor: COLORS.background,
            borderWidth: 1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
        },
        scrollViewContainer: {
            width: '100%',
            height: 50,
        },
    })

    const handleColorPress = (color) => {
        setColor(color);
    };

    const colorsElements = COLORS_PICKER.map((color) => (
        <TouchableWithoutFeedback key={color} onPress={() => handleColorPress(color)}>
            <View style={[styles.icons, { backgroundColor: color }]} />
        </TouchableWithoutFeedback>
    ))

    console.log(sda);
    return (
        <View style={styles.scrollViewContainer}>
            <ScrollView horizontal>
                <View style={styles.container}>
                    {colorsElements}
                </View>
            </ScrollView>
        </View>
    );
}