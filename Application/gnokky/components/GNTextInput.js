import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const GNTextInput = ({ placeholder, iconName, iconNameFocused, secureTextEntry, onChangeText }) => {

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const iconNamee = isFocused ? iconNameFocused : iconName;
  const color = isFocused ? "#333" : "#888";

  return (
    <View style={styles.container}>
      <Ionicons name={iconNamee} size={24} color={color} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#888"
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    marginBottom: 16,
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


export default GNTextInput;
