import NewStoryPage from '../Stories/NewStoryPage';
import GNCamera from '../GN/GNCamera';
import { Modal } from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function CreateStoriesNavigator({ navigation }) {

    const [modalStoriesVisible, setModalStoriesVisible] = useState(false);
    const [modalSelectionMedia, setModalSelectionMedia] = useState(true);
    const [media, setMedia] = useState("");
    const [mediaType, setMediaType] = useState("");

    useEffect(() => {
        if (!modalSelectionMedia) {
            console.log("UseEffect: " + media + " " + mediaType);
            setModalStoriesVisible(true);
        }
    }, [modalSelectionMedia]);

    return (
        <>
            <Modal visible={modalStoriesVisible} animationType="slide">
                <NewStoryPage
                    onClose={() => {
                        setModalStoriesVisible(false)
                        navigation.navigate("NavigatorTab");
                    }}
                    media={media}
                    mediaType={mediaType} />
            </Modal>
            <Modal visible={modalSelectionMedia} animationType="slide">
                <GNCamera
                    onCancel={() => {
                        setModalSelectionMedia(false);
                        navigation.navigate("NavigatorTab");
                    }}
                    onSave={(media) => {
                        setMedia(media.uri);
                        setMediaType("image")
                        setModalSelectionMedia(false);
                    }}
                    onOpen={async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            quality: 1,
                        });

                        if (!result.canceled) {
                            setMedia(result.assets[0].uri);
                            setMediaType(result.assets[0].type);
                            setModalSelectionMedia(false);
                        }
                    }}
                    displayOpenGallery={true} />
            </Modal>
        </>
    );


}