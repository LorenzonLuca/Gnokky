import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
import GNAppBar from './GNAppBar';
import GNTextInput from './GNTextInput';
import { COLORS, spotifyIntegration } from '../Models/Globals';
import { useState } from 'react';

export default function GNMusicSelector({ onCancel, onSave }) {
    const [searchItems, setSearchItems] = useState([]);

    const styles = StyleSheet.create({
        scrollViewContainer: {
            marginVertical: 5,
        },
        noItems: {
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        song: {
            marginVertical: 2,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center'
        },
        songInfo: {
            marginHorizontal: 20,
            flexDirection: 'column',
            flex: 1,

        },
        songTitle: {
            fontSize: 17,
            color: COLORS.firtText,
        },
        songArtists: {
            fontSize: 14,
            color: COLORS.secondText,
        }
    })

    const handleResearch = async (search) => {
        if (search === "" || search === null || search === undefined) {
            setSearchItems([]);
        } else {
            const items = await spotifyIntegration.searchForTrack(search);
            setSearchItems(items.tracks.items);
        }
    }

    const generateArtists = (artists) => {
        return artists.map((artist, index) => {
            if (index < artists.length - 1) {
                return artist.name + ", ";
            } else {
                return artist.name;
            }
        });
    }

    const generateList = searchItems.map((element) => {

        const size = element.album.images[1].width / 3;

        return (
            <TouchableWithoutFeedback key={element.id} onPress={() => {
                console.log("Selected song: ", element.name);
                onSave(element);
            }}>
                <View style={styles.song}>
                    <Image
                        source={{ uri: element.album.images[1].url }}
                        style={{
                            width: size,
                            height: size,
                            borderRadius: size / 6,
                        }}
                    />
                    <View style={styles.songInfo}>
                        <Text style={styles.songTitle}>{element.name}</Text>
                        <Text style={styles.songArtists}>{generateArtists(element.artists)}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    });

    return (
        <View style={{ flex: 1 }}>
            <GNAppBar iconLeading='close-outline' onPressLeading={() => { onCancel() }} iconTrailing="" />
            <ScrollView style={styles.scrollViewContainer}>
                <GNTextInput
                    placeholder="Search"
                    iconName="search-outline"
                    iconNameFocused="search-sharp"
                    onChangeText={handleResearch}
                    animation={true}
                    width={'100%'}
                />
                {searchItems.length > 0 ? (
                    <>
                        {generateList}
                    </>
                ) : (
                    <View style={styles.noItems}>
                        <Text>Search a song or an album</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}