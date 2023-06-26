import { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, View, StyleSheet, Text, Image, TouchableWithoutFeedback, Modal } from "react-native";
import StoriesVisualizer from "../GN/StoriesVisualizer";
import FirebaseUtils from "../Models/FirebaseUtils";
import { appUser, COLORS } from "../Models/Globals";
import StoriesUtils from "../Models/StoriesUtils";
import HomeFeedUtils from "./HomeFeedUtils";


export default function HomeStories({ fetchedStories, refreshStories, refreshMyStory }) {
    const [stories, setStories] = useState(fetchedStories);
    const [openStory, setOpenStory] = useState(false);
    const [userStories, setUserStories] = useState(0);
    const [myStories, setMyStories] = useState([]);
    const [openMyStories, setOpenMyStories] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const getAllProfilePic = async (myStories) => {
        const result = await StoriesUtils.getAllProfilePic(myStories);
        setMyStories(result);
    };

    useEffect(() => {
        if (appUser.id) {
            HomeFeedUtils.getStoriesByUser(appUser.id)
                .then((result) => {
                    setStories(result);
                })
            StoriesUtils.getStoriesByUsername(appUser.username)
                .then((result) => {
                    getAllProfilePic(result);
                })
        }
    }, [openStory])

    useEffect(() => {
        setStories(fetchedStories);
    }, [fetchedStories])

    useEffect(() => {
        if (refresh || refreshMyStory) {
            const refetchYourStory = async () => {
                const newMyStory = await StoriesUtils.getStoriesByUsername(appUser.username)

                getAllProfilePic(newMyStory);
                setRefresh(false);
            }

            refetchYourStory();
        }
    }, [refresh, refreshMyStory])

    const size = 85;

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginBottom: 7
        },
        storyContainer: {
            alignItems: 'center',
            marginHorizontal: 5
        },
        storyIcon: {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: COLORS.elements
        },
        media: {
            aspectRatio: 1,
        }
    });

    if (stories === null) {
        return (
            <ScrollView horizontal>
                <ActivityIndicator size="large" color={COLORS.elements} />
            </ScrollView>
        );
    }

    if (stories && stories.length > 0) {
        const handleOpenStory = (user) => {
            console.log("MAREMMA HANE ", user[0].owner)
            setUserStories(stories.indexOf(user));
            setOpenStory(true);
        }

        const handleOpenYourStory = () => {
            setOpenMyStories(true);
        }

        const handleAlreadySeen = (user) => {
            let result = true;
            user.forEach(story => {
                console.log("storyyyyyyyyyyyyyyyyy", story);
                let tmpResult = false;
                story.watchedBy.forEach((users) => {
                    if (users.username == appUser.username) {
                        console.log("UELA SOIC ", users.username, "MA ALORA ", appUser.username);
                        tmpResult = true;
                    }
                });
                if (!tmpResult) {
                    result = tmpResult;
                }

            });
            return result;
        }

        const myStory = myStories && myStories.length > 0 && (
            <View key={myStories[0].owner} style={styles.storyContainer} >
                {console.log("GENERATING Your STORY ICONS")}
                <View style={styles.storyIcon}>
                    <TouchableWithoutFeedback onPress={() => handleOpenYourStory()}>
                        <Image source={{ uri: appUser.profilePic }} resizeMode="cover" style={styles.media} />
                    </TouchableWithoutFeedback>
                </View>
                <Text>Your story</Text>
            </View >
        )

        const storiesElements = stories.map((user) => (
            <View key={user[0].owner} style={styles.storyContainer} >
                {console.log("GENERATING STORY ICONS", user)}
                {console.log("USER ALREADY SEEN : ", handleAlreadySeen(user))}
                <View style={[styles.storyIcon, { borderColor: handleAlreadySeen(user) ? COLORS.firtText : COLORS.elements }]}>
                    <TouchableWithoutFeedback onPress={() => handleOpenStory(user)}>
                        <Image source={{ uri: user[0].profilePic }} resizeMode="cover" style={styles.media} />
                    </TouchableWithoutFeedback>
                </View>
                <Text>{user[0].owner}</Text>
            </View >
        ))

        const handleCloseStoriesModal = () => {
            setOpenStory(false);
            setOpenMyStories(false);
        };

        const handleSetRefresh = () => {
            refreshStories();
            setRefresh(true)
        }

        return (
            <ScrollView horizontal>
                <View style={styles.container}>
                    {(myStories && myStories.length > 0) &&
                        [myStory]
                    }
                    {storiesElements}
                    <Modal visible={openStory} animationType='slide'>
                        <StoriesVisualizer stories={stories} closeStories={handleCloseStoriesModal} startIndex={userStories} />
                    </Modal>
                    <Modal visible={openMyStories} animationType='slide'>
                        <StoriesVisualizer
                            stories={myStories}
                            closeStories={handleCloseStoriesModal}
                            property={true}
                            viewAction={true}
                            refreshAllStories={handleSetRefresh}
                        />
                    </Modal>
                </View>
            </ScrollView>
        );
    }
}