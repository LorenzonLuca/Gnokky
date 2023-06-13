import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function NotificationsPage({ navigation }) {

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#25292e',
        },
        contentContainer: {
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        header: {
        },
        headerText: {
          fontSize: 20,
          textAlign: 'center',
          color: '#F8D154',
          fontSize: 45,
          fontFamily: 'mnst-bold'
        },
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 30,
        },
        body: {
          flex: 1,
          padding: 20,
        },
        bodyText: {
          fontSize: 16,
        },
        footer: {
          backgroundColor: '#f2f2f2',
          padding: 20,
        },
        footerText: {
          fontSize: 18,
          fontWeight: 'bold',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* <Text style={styles.headerText}>{title}</Text> */}
                <GNAppBar title='Gnokky'></GNAppBar>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.body}>
                    <Text>Notification Page</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}