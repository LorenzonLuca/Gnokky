import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../Models/Globals";


export default function GNTextInputMultiLine({ placeholder, onChangeText, width = '75%', minHeight = 50, marginBottom = 24, defaultValue = "" }) {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: COLORS.background,
            marginBottom: marginBottom,
            paddingHorizontal: 24,
            paddingTop: 14,
            minHeight: minHeight,
            borderColor: COLORS.elements,
            borderWidth: 1,
        },
        input: {
            flex: 1,
            alignItems: 'center',
            fontSize: 16,
            color: COLORS.firtText,
            width: '100%',
            height: '100%',
            textAlignVertical: 'top',
            borderRadius: 15,
            backgroundColor: COLORS.background,
        }
    });

    return (
        <View style={styles.container} >
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                placeholderTextColor={COLORS.secondText}
                selectionColor={COLORS.firtText}
                onChangeText={onChangeText}
                multiline={true}
                defaultValue={defaultValue}
            />
        </View>
    );
};


