import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GNTextInputMultiLine({ placeholder, onChangeText, width = '75%', height = 50, marginBottom = 24 }) {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            width: width,
            height: height,
            borderRadius: 15,
            backgroundColor: '#F5F5F5',
            paddingHorizontal: 16,
            marginBottom: marginBottom,
        },
        input: {
            flex: 1,
            alignItems: 'center',
            fontSize: 16,
            color: '#333',
            width: width,
            height: height,
            textAlignVertical: 'top',
            borderRadius: 15,
            backgroundColor: '#F5F5F5',
            marginBottom: marginBottom,
            padding: 16,
        }
    });

    return (
        <TextInput
            placeholder={placeholder}
            style={styles.input}
            placeholderTextColor="#888"
            selectionColor="#F8D154"
            onChangeText={onChangeText}
            multiline={true}
        />
    );
};


