import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback, Modal } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NewPostPage from '../Post/NewPostPage';
import { COLORS } from '../Models/Globals';


export default function FloatingButton() {

    const [modalVisible, setModalVisible] = useState(false);

    const animation = new Animated.Value(0);
    let open = false;

    const navigation = useNavigation();


    const toggleMenu = () => {
        const toValue = open ? 0 : 1;

        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: true,
        }).start();

        open = !open;
    };

    const textStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -75]
                })
            }
        ]
    };

    const mediaStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -150]
                })
            }
        ]
    };

    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                })
            }
        ]
    };

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
        },
        button: {
            top: -35,
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            alignItems: "center",
            justifyContent: "center",
        },
        menu: {
            backgroundColor: COLORS.elements
        },
        secondaryButton: {
            borderColor: 'rgba(160, 32, 240, 0.33)',
            borderWidth: 1,
        },
        secondary: {
            position: "absolute",
            width: 58,
            height: 58,
            borderRadius: 58 / 2,
            backgroundColor: COLORS.fourthText
        }
    });


    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} animationType="slide">
                <NewPostPage onClose={() => setModalVisible(false)}></NewPostPage>
            </Modal>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <Animated.View style={[styles.button, styles.secondary, styles.secondaryButton, mediaStyle]}>
                    <Entypo name="image" size={20} color={COLORS.elements} />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate("Post")}>
                <Animated.View style={[styles.button, styles.secondary, styles.secondaryButton, textStyle]}>
                    <Entypo name="text" size={20} color={COLORS.elements} />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button, styles.menu, styles.primary, rotation]}>
                    <AntDesign name="plus" size={24} color={COLORS.background} />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View >
    );
};