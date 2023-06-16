import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";
import { Modal } from 'react-native-paper';
import GNTextInput from '../GN/GNTextInput';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { COLORS } from '../Models/Globals';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function DraggableTextInput() {
    const [text, setText] = useState("Enter text");
    const [showModal, setShowModal] = useState(false);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    const _keyboardDidHide = () => {
        setShowModal(false);
        Keyboard.dismiss;
    };

    const onDrag = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    const handlePressText = () => {
        setShowModal(true);
    }

    const styles = StyleSheet.create({
        textInput: {
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            fontSize: 20,
            color: '#000',
            backgroundColor: 'transparent',
            color: text === "Enter text" ? COLORS.secondText : COLORS.firtText
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    return (
        <>
            <PanGestureHandler onGestureEvent={onDrag}>
                <AnimatedView style={[containerStyle, { top: -350 }]}>
                    <Text style={styles.textInput} onPress={handlePressText}>{text}</Text>
                </AnimatedView>
            </PanGestureHandler>
            <Modal visible={showModal} tranparent>
                <View style={styles.container}>
                    <GNTextInput
                        autoFocus={true}
                        placeholder={"Enter text"}
                        defaultValue={text !== "Enter text" ? text : ""}
                        onChangeText={setText}
                    />
                </View>
            </Modal>
        </>
    );

}