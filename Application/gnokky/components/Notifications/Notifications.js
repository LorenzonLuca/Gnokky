import {
    View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground,
    ActivityIndicator, Image, TouchableWithoutFeedback
} from 'react-native';
import Divider from '../GN/Divider';
import GNProfileImage from '../GN/GNProfileImage';
import { COLORS } from '../Models/Globals';


export default function Notifications({ elements, navigation }) {

    return elements.map((element, index) => {
        switch (element.class) {
            case 'post':
                return notificationPost(element, element.type);
            case 'story':
                return notificationStory(element);
            case 'profile':
                return notificationProfile(element, navigation)
        }
    })
}

const transformDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${hours}:${minutes} ${period}`;
}

const notificationPost = (element, type) => {
    console.log("POst notification, ", element);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 5,
        },
        centerContent: {
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
            flex: 1
        },
        textUsername: {
            fontWeight: 'bold',
        },
        postContainer: {
        },
        postContent: {
            width: 60,
            height: 60,
        },
        dateText: {
            color: COLORS.secondText,
        }
    })

    return (
        <View key={element.id}>
            <View style={styles.container}>
                <GNProfileImage selectedImage={element.user.profilePic} size={60} />
                <View style={styles.centerContent}>
                    <Text numberOfLines={2}>
                        <Text style={styles.textUsername}>{element.user.username} </Text>
                        {type === 'like' ? (
                            <>liked your post!</>
                        ) : (
                            <>commented your post!</>
                        )}

                    </Text>
                    <Text style={styles.dateText}>{transformDate(element.timestamp)}</Text>
                </View>
                <View style={styles.postContainer}>
                    <Image source={{ uri: element.post.downloadUrl }} style={styles.postContent} />
                </View>
            </View>
            <Divider />
        </View >

    )
}

const notificationStory = (element) => {
    console.log("Story notification, ", element);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 5,
        },
        centerContent: {
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
            flex: 1
        },
        textUsername: {
            fontWeight: 'bold',
        },
        postContainer: {
        },
        postContent: {
            width: 60,
            height: 60,
        },
        dateText: {
            color: COLORS.secondText,
        }
    })

    return (
        <View key={element.id}>
            <View style={styles.container}>
                <GNProfileImage selectedImage={element.user.profilePic} size={60} />
                <View style={styles.centerContent}>
                    <Text numberOfLines={2}>
                        <Text style={styles.textUsername}>{element.user.username} </Text>
                        liked your story!
                    </Text>
                    <Text style={styles.dateText}>{transformDate(element.timestamp)}</Text>
                </View>
                <View style={styles.postContainer}>
                    <Image source={{ uri: element.story.img }} style={styles.postContent} />
                </View>
            </View>
            <Divider />
        </View >

    )
}
const notificationProfile = (element, navigation) => {
    console.log("Profile notification, ", element);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 5,
        },
        centerContent: {
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
            flex: 1
        },
        textUsername: {
            fontWeight: 'bold',
        },
        dateText: {
            color: COLORS.secondText,
        }
    })

    return (
        <View key={element.id}>
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("ProfileSearch", { user: element.user })}>
                <GNProfileImage selectedImage={element.user.profilePic} size={60} />
                <View style={styles.centerContent}>
                    <Text numberOfLines={2}>
                        <Text style={styles.textUsername}>{element.user.username} </Text>
                        started following you
                    </Text>
                    <Text style={styles.dateText}>{transformDate(element.timestamp)}</Text>
                </View>
            </TouchableOpacity>
            <Divider />
        </View>

    )
}