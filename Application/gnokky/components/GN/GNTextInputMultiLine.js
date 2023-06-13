import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GNTextInputMultiLine({ placeholder, onChangeText, width = '75%', height = 50, marginBottom = 24, defaultValue = "" }) {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: '#F5F5F5',
            marginBottom: marginBottom,
        },
        input: {
            flex: 1,
            alignItems: 'center',
            fontSize: 16,
            color: '#333',
            width: '100%',
            height: '100%',
            textAlignVertical: 'top',
            borderRadius: 15,
            backgroundColor: '#F5F5F5',
            padding: 16,
            borderColor: 'black',
            borderWidth: 10,
        }
    });

    return (
        <View style={styles.container} >
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                placeholderTextColor="#888"
                selectionColor="#F8D154"
                onChangeText={onChangeText}
                multiline={true}
                defaultValue={defaultValue}
            />
        </View>
    );
};


