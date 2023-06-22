import 'react-native-gesture-handler';
import React from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet, Animated } from 'react-native';
import { BottomSheet, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { COLORS } from '../Models/Globals';
import Divider from './Divider';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function GNBottomSheetModal({ modalRef, height = '25%', children, title = "Options" }) {

    const snapPoints = [height];

    const handleDismissModal = () => {
        modalRef.current?.dismiss();
    }

    const styles = StyleSheet.create({
        bottomSheetContent: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        bottomSheetTitle: {
            fontWeight: "900",
            letterSpacing: 0.5,
            fontSize: 16,
            paddingBottom: 15,
        },
    });

    return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 30, backgroundColor: COLORS.fourthText }}
            style={{ elevation: 1000, zIndex: 1000 }}
            backdropComponent={({ style }) => (
                <TouchableWithoutFeedback onPress={handleDismissModal} >
                    <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                </TouchableWithoutFeedback>
            )}
        >
            <View style={styles.bottomSheetContent}>
                <Text style={styles.bottomSheetTitle}>{title}</Text>
                {children}
            </View>
        </BottomSheetModal>
    );
}


