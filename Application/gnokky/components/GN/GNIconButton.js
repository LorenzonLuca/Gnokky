import { COLORS } from '../Models/Globals';
import { TouchableWithoutFeedback, View, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GNIconButton({ iconName, backgroundColor = COLORS.elements, color = COLORS.background,
    width = '25%', height = 80, onPress, size = 50, style, }) {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            width: width,
            height: height,
        },
        button: {
            flex: 1,
            borderRadius: size,
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: backgroundColor,
        },
    });



    return (
        <View style={[styles.container, style]}>
            <TouchableWithoutFeedback onPress={onPress}>
                <Animated.View style={[styles.button]}>
                    <Ionicons name={iconName} size={size} color={color} />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}