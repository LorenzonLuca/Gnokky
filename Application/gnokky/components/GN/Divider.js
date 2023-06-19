import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Divider({color = 'black',width = 1}){

    const styles = StyleSheet.create({
        divider: {
            borderBottomColor: color, // Colore della riga
            borderBottomWidth: width, // Spessore della riga
            marginVertical: 5,
            width: '100%', // Margine verticale
        },
    });


  return <View style={styles.divider} />;
};

