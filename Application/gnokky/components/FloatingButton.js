import { StyleSheet, Text, View , Animated, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import {AntDesign, Entypo} from '@expo/vector-icons';

export default class FloatingButton extends React.Component{
    animation = new Animated.Value(0);

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1;

        Animated.spring(this.animation, {
            toValue,
            friction: 5,
            useNativeDriver: true,
        }).start();

        this.open = !this.open;
    }

    render(){
        const textStyle = {
            transform: [
                {scale: this.animation},
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -75]
                    })
                }
            ]
        }

        const mediaStyle = {
            transform: [
                {scale: this.animation},
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -150]
                    })
                }
            ]
        }

        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "45deg"]
                    })
                }
            ]
        }

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback>
                        <Animated.View style={[styles.button, styles.secondary, mediaStyle]}>
                            <Entypo name="image" size={20} color="#F02A4B"/>
                        </Animated.View>
                </TouchableWithoutFeedback>
            
                <TouchableWithoutFeedback>
                        <Animated.View style={[styles.button, styles.secondary, textStyle]}>
                            <Entypo name="text" size={20} color="#F02A4B"/>
                        </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                        <Animated.View style={[styles.button, styles.menu, styles.primary, rotation]}>
                            <AntDesign name="plus" size={24} color="#FFF"/>
                        </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
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
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        shadowOffset: {height: 10}
    },
    menu: {
        backgroundColor: "#F02A4B"
    },
    secondary: {
        position: "absolute",
        width: 58,
        height: 58,
        borderRadius: 58 / 2,
        backgroundColor: "#FFF"
    }
});