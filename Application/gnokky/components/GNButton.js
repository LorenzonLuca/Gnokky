import React, { useState, useRef } from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet, Animated } from 'react-native';

export default function GNButton({ title, backgroundColor = '#F8D154', color = '#25292e', 
width = '75%', height = 50, onPress, marginBottom = 24, style }) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 15,
      backgroundColor: backgroundColor,
      marginBottom: marginBottom,
    },
    button: {
      flex: 1,
      fontSize: 16,
      borderRadius: 15,
      color: '#333',
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
    },
    text: {
      color: color,
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
    },
  });



  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[styles.button, style]}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}
