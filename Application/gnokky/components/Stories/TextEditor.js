import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS } from './../Models/Globals';
import { useState } from 'react';

export default function TextEditor({ setNewFontSize, startValue }) {
    const [fontSize, setFontSize] = useState(startValue);

    const styles = StyleSheet.create({
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
        icons: {
            marginHorizontal: 10,
        }
    })

    const handleChangeFontSize = (fontsize) => {
        console.log("Changing font", fontSize);
        setFontSize(fontsize);
        setNewFontSize(fontSize);
    }

    return (
        <View style={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={6}
                    maximumValue={50}
                    value={fontSize}
                    onValueChange={handleChangeFontSize}
                    minimumTrackTintColor={COLORS.elements}
                    maximumTrackTintColor="#000000"
                    thumbTintColor={COLORS.elements}
                />
            </View>
        </View>
    )
}