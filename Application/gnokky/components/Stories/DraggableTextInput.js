import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";
import { Modal } from 'react-native-paper';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler
} from 'react-native-reanimated';
import { COLORS } from '../Models/Globals';
import ColorPicker from './ColorPicker';
import GNTextInputMultiLine from '../GN//GNTextInputMultiLine';
import TextEditor from './TextEditor';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function DraggableTextInput({ setBottomBar, setColorPicker, setTextEditor, innerKey, closeDraggable,
    setIndexDraggable }) {

    const [text, setText] = useState("Enter text");
    const [showModal, setShowModal] = useState(true);
    const [color, setColor] = useState('#000');
    const [fontSize, setFontSize] = useState(15);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const colorPicker = (<ColorPicker setColor={(color) => onColorChange(color)} key={innerKey} />);
    const textEditor = (
        <TextEditor
            setNewFontSize={(fontsize) => onFontSizeChange(fontsize)}
            key={innerKey}
            startValue={fontSize}
        />
    );

    useEffect(() => {
        handlePressText()
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const closeInterface = () => {
        console.log("Uela badola");
        setBottomBar(true);
        setShowModal(false);
        setColorPicker(null);
        setTextEditor(null);

    }

    const _keyboardDidHide = () => {
        // setColorPicker(null)
        // setShowModal(false);
        // setBottomBar(true);
        Keyboard.dismiss();
    };

    const _keyboardDidShow = () => {

    }

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
        setColorPicker(colorPicker);
        setTextEditor(textEditor);
        closeDraggable(() => closeInterface);
        setIndexDraggable(innerKey);
    }

    const onColorChange = (color) => {
        setColor(color);
    };

    const onFontSizeChange = (fontsize) => {
        console.log("FONT CMBIATO AOOOOOO");
        setFontSize(fontsize);
    }

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
        <>
            <PanGestureHandler onGestureEvent={onDrag}>
                <AnimatedView style={[containerStyle, { top: '-50%' }]}>
                    <Text
                        style={[
                            styles.textInput, {
                                // display: !showModal ? "flex" : "none",
                                fontSize: fontSize,
                            }
                        ]}
                        onPress={handlePressText}>
                        {text}
                    </Text>
                </AnimatedView>
            </PanGestureHandler>
            <Modal visible={showModal} transparent>
                <View style={styles.container}>
                    <View style={styles.modalContent}>
                        <GNTextInputMultiLine
                            autoFocus={true}
                            // placeholder={"Enter text"}
                            defaultValue={text !== "Enter text" ? text : ""}
                            onChangeText={setText}
                            colorInput={color}
                            backgroundColor={'rgba(0, 0, 0, 0)'}
                            fontSize={fontSize}
                            minHeight={fontSize * 2}
                        />
                    </View>
                </View>
            </Modal>
        </>
    )


}