import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { COLORS, appUser } from '../Models/Globals';
import GNTextInput from '../GN/GNTextInput';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import ListResearchChat from './ListResearchChat';
import FirebaseUtils from '../Models/FirebaseUtils';
import ChatUtils from '../Models/ChatUtils';



export default function ChatPage({ navigation }) {

    const [existingChats, setExistingChats] = useState([]);
    const [otherUser, setOtherUser] = useState([]);
    const [research, setResearch] = useState("");
    const [showExistingChats, setShowExistingChats] = useState(true);
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        const getExisting = async (keyword) => {
            const chats = await ChatUtils.getAllChats(keyword);
            return chats;
        }

        const isEqual = (obj1, obj2) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }

        const findUniqueValues = (arr1, arr2) => {
            // const uniqueValues = arr1.filter(value => !arr2.some(item => isEqual(item, value)));
            const uniqueValues = arr1.filter((value) =>
                !arr2.some((item) => item.username === value.username)
            );

            return uniqueValues;
        };

        if (research !== "") {
            const lowerResearch = research.toLowerCase();

            FirebaseUtils.findUserFromSearchBar(lowerResearch)
                .then(async (result) => {
                    const existing = await getExisting(lowerResearch);

                    const other = findUniqueValues(result, existing);

                    console.log("EXISTINGGGGGGGGGGGG", existing, "OTHERRRRRRRRRRRRRRRRRRRRRRRR", other, "RESULTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", result);
                    setExistingChats(existing);
                    setOtherUser(other);
                })
        }
    }, [research, refresh])

    const handleResearch = (text) => {
        console.log("RESEARCH: ", text);
        setResearch(text)
    }

    const handleFocusSearchBar = () => {
        setShowExistingChats(false);
    }
    const handleBlurSearchBar = () => {
        if (research === "") {
            setShowExistingChats(true);
            setExistingChats([]);
            setOtherUser([]);
        }
    }
    const handleRefreshChats = () => {
        setRefresh(!refresh);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
            width: '100%'
        },
        contentContainer: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        body: {
            flex: 1,
            padding: 20,
            width: '100%'
        },
        header: {
            paddingVertical: 25,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.header}>
                    <GNTextInput
                        placeholder="Search"
                        iconName="search-outline"
                        iconNameFocused="search-sharp"
                        onChangeText={handleResearch}
                        animation={true}
                        width={'95%'}
                        onFocus={handleFocusSearchBar}
                        onBlur={handleBlurSearchBar}
                    />
                </View>
                <View style={styles.body}>
                    {showExistingChats ? (
                        <></>
                    ) : (
                        <ListResearchChat
                            existingChats={existingChats}
                            otherUsers={otherUser}
                            refresh={handleRefreshChats}
                            navigation={navigation}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}