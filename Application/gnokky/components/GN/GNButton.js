import React from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../Models/Globals';

export default function GNButton({ title, backgroundColor = COLORS.elements, color = COLORS.background,
  width = '75%', height = 50, onPress, marginBottom = 24, style, isDisabled = false, onTouchStart }) {

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: width,
      height: height,
    },
    button: {
      flex: 1,
      borderRadius: 15,
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      marginBottom: marginBottom,
    },
    text: {
      color: color,
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container} onTouchStart={onTouchStart}>
      <TouchableWithoutFeedback disabled={isDisabled} onPress={onPress}>
        <Animated.View style={[styles.button, style]}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}
