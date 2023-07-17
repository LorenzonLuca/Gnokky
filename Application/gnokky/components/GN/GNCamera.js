import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';
import GNIconButton from './GNIconButton';
import GNAppBar from './GNAppBar';
import { useState, useEffect } from 'react';
import { COLORS } from '../Models/Globals';

export default function GNCamera({ onSave, onCancel }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(CameraType.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            console.log('Taken photo:', photo);
            onSave(photo);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function toggleCameraType() {
        console.log("Changed type camera");
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        cameraContainer: {
            flex: 1,
            position: 'relative',
            justifyContent: 'center', // Align items vertically to center
        },
        photoButtonContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 20,
        },
        centerPhotoButton: {
            flex: 1,
            alignItems: 'center',
        },
        rowContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });

    return (
        <View style={{ flex: 1 }}>
            <GNAppBar iconLeading='arrow-back' onPressLeading={() => { onCancel() }} iconTrailing="" />
            <View style={styles.cameraContainer}>
                <Camera style={styles.container} type={type} ref={(ref) => setCameraRef(ref)} ratio={'16:9'} />
                <View style={styles.photoButtonContainer}>
                    <GNIconButton
                        iconName={""}
                        height={50}
                        size={30}
                        color={'rgba(0,0,0,0)'}
                        backgroundColor={'rgba(0,0,0,0)'}
                    />
                    <View style={styles.centerPhotoButton}>
                        <View style={styles.rowContainer}>
                            <GNIconButton
                                onPress={takePicture}
                                iconName={"camera-outline"}
                                color={COLORS.elements}
                            />
                        </View>
                    </View>
                    <GNIconButton
                        onPress={toggleCameraType}
                        iconName={"camera-reverse-outline"}
                        height={50}
                        size={30}
                        color={COLORS.background}
                        backgroundColor={'rgba(0,0,0,0)'}
                    />
                </View>
            </View>
        </View>
    );

};