import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../Models/Globals';

export default function GNErrorModal({ visible = true, onClose, title, message, }) {

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            backgroundColor: COLORS.background,
            borderRadius: 15,
            alignItems: 'center',
            margin: 20,
            paddingBottom: 10
        },
        titleContainer: {
            backgroundColor: COLORS.error,
            width: '100%',
            paddingHorizontal: '20%',
            paddingVertical: 10
        },
        contentContainer: {
            maxWidth: '75%',
            paddingTop: 10,
        },
        buttonContainer: {
            alignItems: 'center'
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            textAlign: 'center'
        },
        message: {
            fontSize: 16,
            marginBottom: 24,
            textAlign: 'center',
        },
        actionButton: {
            backgroundColor: '#F8D154',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            marginBottom: 16,
        },
        actionButtonText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
        },
        closeButton: {
            marginTop: 12,
        },
        closeButtonText: {
            fontSize: 18,
            color: COLORS.secondText,
        },
    });

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.message}>{message}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
