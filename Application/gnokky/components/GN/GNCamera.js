import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';
import GNIconButton from './GNIconButton';
import { useState, useEffect } from 'react';
import { COLORS } from '../Models/Globals';

export default function GNCamera({ onSave }) {
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
        centerItem: {
            alignItems: 'center',
            justifyContent: 'center',
            height: '15%'
        },
        photoButtonContainer: {
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            justifyContent: 'space-between'
        },
        centerPhotoButton: {
            flex: 1,
            alignSelf: 'center',
            alignItems: 'center'
        },
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 30,
        },

    });

    return (
        <View style={{ flex: 1 }}>
            <Camera style={styles.container} type={type} ref={(ref) => setCameraRef(ref)} ratio={'16:9'} />
            <View style={styles.centerItem}>
                <View style={styles.photoButtonContainer}>
                    <View style={styles.centerPhotoButton}>
                        <View style={styles.rowContainer}>
                            <GNIconButton onPress={takePicture} iconName={"camera-outline"} />
                            <GNIconButton
                                onPress={toggleCameraType}
                                iconName={"camera-reverse-outline"}
                                width={'15%'}
                                height={50}
                                size={30}
                                backgroundColor={COLORS.background}
                                color={COLORS.firtText}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};