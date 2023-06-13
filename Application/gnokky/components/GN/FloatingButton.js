import React, {useState, useEffect} from 'react';
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

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} animationType="slide">
                <NewPostPage onCancel={() => setModalVisible(false)}></NewPostPage>
            </Modal>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <Animated.View style={[styles.button, styles.secondary, mediaStyle]}>
                    <Entypo name="image" size={20} color={COLORS.elements} />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate("Post")}>
                <Animated.View style={[styles.button, styles.secondary, textStyle]}>
                    <Entypo name="text" size={20} color={COLORS.elements} />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button, styles.menu, styles.primary, rotation]}>
                    <AntDesign name="plus" size={24} color={COLORS.textBlack} />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

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
        shadowRadius: 10,
        shadowColor: COLORS.textBlack,
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 }
    },
    menu: {
        backgroundColor: COLORS.elements
    },
    secondary: {
        position: "absolute",
        width: 58,
        height: 58,
        borderRadius: 58 / 2,
        backgroundColor: COLORS.background
    }
});
