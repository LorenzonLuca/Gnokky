import { COLORS } from '../Models/Globals';
import { TouchableWithoutFeedback, View, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GNIconButton({ iconName, backgroundColor = COLORS.background, color = COLORS.firtText,
    height = 80, onPress, size = 50, style, }) {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            width: height,
            height: height,
        },
        button: {
            flex: 1,
            borderRadius: height / 2,
            width: height,
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