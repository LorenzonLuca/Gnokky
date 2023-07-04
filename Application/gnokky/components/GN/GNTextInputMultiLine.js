import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../Models/Globals";


export default function GNTextInputMultiLine({ placeholder, onChangeText, width = '75%', minHeight = 50, marginBottom = 24,
    defaultValue = "", colorInput, backgroundColor, autoFocus, fontSize = 16 }) {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: backgroundColor ? backgroundColor : COLORS.fourthText,
            marginBottom: marginBottom,
            paddingHorizontal: 24,
            paddingTop: 14,
            paddingBottom: 10,
            minHeight: minHeight > 50 ? minHeight : 50,
            // borderColor: COLORS.firtText,
            // borderWidth: 1,
        },
        input: {
            flex: 1,
            alignItems: 'center',
            fontSize: fontSize,
            color: colorInput ? colorInput : COLORS.firtText,
            width: '100%',
            height: '100%',
            textAlignVertical: 'top',
            borderRadius: 15,
            backgroundColor: backgroundColor ? backgroundColor : COLORS.fourthText,
        }
    });

    return (
        <View style={styles.container} >
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                placeholderTextColor={COLORS.secondText}
                selectionColor={COLORS.fourthText}
                onChangeText={onChangeText}
                multiline={true}
                defaultValue={defaultValue}
                autoFocus={autoFocus}
            />
        </View>
    );
};


