import React, { useState, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

export default function GNButton({title, backgroundColor = '#F8D154', color = '#25292e', width = '75%', height = 50, onPress, style}){
  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginBottom: 24,
      width: width,
      height: height,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    text: {
      color: color,
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );

};
