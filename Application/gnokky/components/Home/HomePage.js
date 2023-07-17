import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import GNAppBar from '../GN/GNAppBar';

import { appUser, COLORS, ROUTES } from '../../components/Models/Globals';
import PostLoader from '../Post/PostLoader';
import HomeFeedUtils from './HomeFeedUtils';
import HomeFeed from './HomeFeed';
import StoriesUtils from '../Models/StoriesUtils';
import { SpeedDial } from '@rneui/themed';
import { useEffect } from 'react';
import FloatingButton from '../GN/FloatingButton';
import { IconButton } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function HomePage({ navigation }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        header: {
        },
        body: {
            flex: 1,
            width: '100%',
        },
        firstLayer: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            zIndex: 999,
            backgroundColor: 'rgba(0, 0, 0, 0)',
        }
    });

    const renderRightHeader = () => {
        return (
            <IconButton
                icon={() => <Ionicons name={'notifications-outline'} size={30} color={'black'} />}
                onPress={() => { navigation.navigate(ROUTES.NOTIFICATION) }}
            />
        )
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: renderRightHeader, // Mostra i dati nell'intestazione
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <HomeFeed id={appUser.id} />
        </SafeAreaView>
    );
}

