import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../Models/Globals";

export default function GNTextInput({ placeholder, iconName, iconNameFocused, secureTextEntry,
  onChangeText, animation = false, width = '75%', height = 50, marginBottom = 24, defaultValue = "" }) {

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width,
      height: height,
      borderRadius: 15,
      backgroundColor: COLORS.fourthText,
      paddingHorizontal: 16,
      marginBottom: marginBottom,
      // borderColor: COLORS.elements,
      // borderWidth: 1,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: COLORS.firtText,
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
  const color = isFocused ? COLORS.firtText : COLORS.secondText;

  if (animation) {
    return (
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ scale: anim }] }}>
          <Ionicons name={iconNamee} size={24} color={color} style={styles.icon} />
        </Animated.View>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor={COLORS.secondText}
          selectionColor={COLORS.fourthText}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          defaultValue={defaultValue}
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
          placeholderTextColor={COLORS.secondText}
          selectionColor={COLORS.fourthText}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          defaultValue={defaultValue}
        />
      </View>
    );
  }
};


