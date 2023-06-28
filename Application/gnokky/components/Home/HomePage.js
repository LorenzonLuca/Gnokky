import { View, Text, StyleSheet, ScrollView,SafeAreaView } from 'react-native';
import GNAppBar from '../GN/GNAppBar';

import { appUser } from '../../components/Models/Globals';
import { COLORS } from '../../components/Models/Globals';
import PostLoader from '../GN/PostLoader';
import HomeFeedUtils from './HomeFeedUtils';
import HomeFeed from './HomeFeed';
import StoriesUtils from '../Models/StoriesUtils';
import { SpeedDial } from '@rneui/themed';
import { useState } from 'react';
import FloatingButton from '../GN/FloatingButton';

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

  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <HomeFeed id={appUser.id} />
      <View style={styles.firstLayer}>
        <FloatingButton/>
      </View>
    </SafeAreaView>
  );
}

