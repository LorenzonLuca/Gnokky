import React, { useState, useRef } from 'react';
import { View, TextInput, Feather, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GNTextInput({ placeholder, multiline = false, iconName, iconNameFocused, secureTextEntry,
  onChangeText, animation = false, width = '75%', height = 50 }) {

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width,
      height: height,
      borderRadius: 15,
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    icon: {
      marginRight: 8,
    },
  });

  const [isFocused, setIsFocused] = useState(false);
  const anim = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    startAnimation();
  };

  const handleBlur = () => {
    setIsFocused(false);
    stopAnimation();
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1.2, duration: 600, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      { iterations: -1 },
    ).start();
  };

  const stopAnimation = () => {
    anim.setValue(1);
    anim.stopAnimation();
  };

  const iconNamee = isFocused ? iconNameFocused : iconName;
  const color = isFocused ? "#333" : "#888";

  if (animation) {
    return (
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ scale: anim }] }}>
          <Ionicons name={iconNamee} size={24} color={color} style={styles.icon} />
        </Animated.View>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor="#888"
          selectionColor="#F8D154"
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Ionicons name={iconNamee} size={24} color={color} style={styles.icon} />
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor="#888"
          selectionColor="#F8D154"
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
        />
      </View>
    );
  }
};


