import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Divider from '../GN/Divider';
import PostLoader from '../GN/PostLoader';
import ProfileData from './ProfileData';

export default function ProfilePage({ navigation, route }) {
    const { user } = route.params;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            //backgroundColor: COLORS.background,
        },
        contentContainer: {
            flexGrow: 1,
            justifyContent: 'center',
        },
        body: {
            flex: 1,
            //justifyContent: 'center',
            alignItems: 'center',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.body}>
                    <ProfileData user={user} />
                    <Divider color={'lightgray'} width={3} />
                    <View style={{ width: '100%' }}>
                        <PostLoader username={user.username} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
