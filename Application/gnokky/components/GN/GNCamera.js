import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';
import GNIconButton from './GNIconButton';
import GNAppBar from './GNAppBar';
import { useState, useEffect } from 'react';
import { COLORS } from '../Models/Globals';

export default function GNCamera({ onSave, onCancel, displayOpenGallery = false, onOpen }) {
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
            height: '9%'
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
            padding: 20,
        },

    });

    return (
        <View style={{ flex: 1 }}>
            <GNAppBar iconLeading='close-outline' onPressLeading={() => { onCancel() }} iconTrailing="" />
            <Camera style={styles.container} type={type} ref={(ref) => setCameraRef(ref)} ratio={'16:9'} />
            <View style={styles.centerItem}>
                <View style={styles.photoButtonContainer}>
                    <View style={styles.centerPhotoButton}>
                        <View style={styles.rowContainer}>
                            {displayOpenGallery ? (
                                <GNIconButton
                                    onPress={onOpen}
                                    iconName={"images-outline"}
                                    width={'15%'}
                                    height={50}
                                    size={30}
                                    backgroundColor={COLORS.background}
                                    color={COLORS.firtText}
                                />
                            ) : (
                                <></>
                            )}
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