import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView } from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";
import { Modal } from 'react-native-paper';
import GNTextInput from '../GN/GNTextInput';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    runOnJS
} from 'react-native-reanimated';
import { COLORS } from '../Models/Globals';
import ColorPicker from './ColorPicker';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function DraggableTextInput({ setBottomBar, setColorPicker, innerKey, draggableSpace = { width: 0, height: 0 }
    , startDraggableSpace = { x: 0, y: 0 } }) {
    const HEIGHT_DIFFERENCE = -350;

    const colorPicker = (<ColorPicker setColor={(color) => onColorChange(color)} key={innerKey} />);
    const [text, setText] = useState("Enter text");
    const [showModal, setShowModal] = useState(true);
    const [color, setColor] = useState('#000');
    const [hideComponent, setHideComponent] = useState(false);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    useEffect(() => {
        handlePressText()
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    const _keyboardDidHide = () => {
        // setColorPicker(null)
        setShowModal(false);
        setBottomBar(true);
        Keyboard.dismiss();
    };

    const onDrag = useAnimatedGestureHandler({
        onStart: (_, context) => {
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
        setBottomBar(false);
        setColorPicker(colorPicker)
    }

    const onColorChange = (color) => {
        setColor(color);
    };

    const styles = StyleSheet.create({
        textInput: {
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            fontSize: 20,
            backgroundColor: 'transparent',
            color: text === "Enter text" ? COLORS.secondText : color,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        iconButton: {
            justifyContent: 'center',
            height: '100%',
            paddingHorizontal: 10,
            marginHorizontal: 10,
            borderRadius: 20,
        },
        modalContent: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 20,
        },
    });

    return (
        !hideComponent && (
            <>
                <PanGestureHandler onGestureEvent={onDrag}>
                    <AnimatedView style={[containerStyle, { top: '-50%' }]}>
                        <Text style={[styles.textInput, { display: !showModal ? "flex" : "none" }]} onPress={handlePressText}>{text}</Text>
                    </AnimatedView>
                </PanGestureHandler>
                <Modal visible={showModal} transparent style={{ borderColor: '#000', borderWidth: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.modalContent}>
                            <GNTextInput
                                autoFocus={true}
                                placeholder={"Enter text"}
                                defaultValue={text !== "Enter text" ? text : ""}
                                onChangeText={setText}
                            />
                        </View>
                    </View>
                </Modal>
            </>
        )
    );

}