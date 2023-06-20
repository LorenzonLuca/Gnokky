import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { appUser, COLORS } from "../Models/Globals";
import { useState } from 'react';

export default function StoriesVisualizer({ stories, closeStories }) {
    const [storyIndex, setStoryIndex] = useState(0);

    const size = 45;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        contentContainer: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        header: {
            backgroundColor: COLORS.background,
            flexDirection: 'row',
            alignItems: 'center',
            margin: 3
        },
        body: {
            flex: 1,
            width: '100%',
        },
        storyIcon: {
            width: size,
            height: size,
            borderRadius: size / 2,
            marginHorizontal: 6
        },
        mediaIcon: {
            width: '100%',
            aspectRatio: 1,
        },
        media: {
            width: '100%',
            height: '100%',
            flexDirection: 'row',
        },
        iconContainer: {
            flex: 1,
            alignItems: 'flex-end'
        },
        storyImg: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            height: '100%',
        },
        buttonContainer: {
            flexDirection: 'row',
        },
        button: {
            opacity: 0,
            flex: 1,
        }
    });

    const handleNextStory = () => {
        console.log("NEXTTTT");
        if (storyIndex < stories.length - 1) {
            setStoryIndex(storyIndex + 1);
        }
    }

    const handlePrevoiusStory = () => {
        console.log("PREVIOUSSSSS");
        if (storyIndex > 0) {
            setStoryIndex(storyIndex - 1);
        }
    }

    return (
        <>
            <View style={styles.header}>
                <View style={styles.storyIcon}>
                    <Image source={{ uri: stories[0].profilePic }} resizeMode="cover" style={styles.mediaIcon} />
                </View>
                <Text>{stories[0].owner}</Text>
                <View style={styles.iconContainer}>
                    <TouchableWithoutFeedback onPress={closeStories}>
                        <Ionicons name='close-outline' size={40} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.storyImg}>
                    <ImageBackground source={{ uri: stories[storyIndex].img }} style={styles.media}>
                        <TouchableOpacity style={styles.button} onPress={handlePrevoiusStory} activeOpacity={1}>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleNextStory} activeOpacity={1}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>
        </>
    );
}