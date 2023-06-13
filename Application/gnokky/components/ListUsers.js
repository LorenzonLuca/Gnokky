import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import GNProfileImage from './GNProfileImage';

export default function ListUsers({ users, navigation }) {
    const styles = StyleSheet.create({
        userContainer: {
            backgroundColor: '#fff',
            borderRadius: 15,
            width: '75%',
            margin: 5,
        },
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 16,
            width: '100%',
            padding: 10,
            color: '#fff'
        },
        dataContainer: {
            marginLeft: 10,
        },
        username: {
            fontSize: 20,
        },
        personalData: {
            fontSize: 12,
        },
    });

    const generateComponents = users.map(user => (
        <TouchableWithoutFeedback key={user.username} onPress={() => { navigation.navigate("ProfileSearch", { user: user }) }}>
            <View style={styles.userContainer}>
                <View style={styles.rowContainer}>
                    <GNProfileImage selectedImage={user.profilePic} size={55} />
                    <View style={styles.dataContainer}>
                        <Text style={styles.username}>{user.username}</Text>
                        <Text style={styles.personalData}>{user.name} {user.surname}</Text>
                        <Text style={styles.personalData}>followers: {user.followers}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    ));

    return (
        <>{generateComponents}</>
    );
}