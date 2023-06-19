import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appUser } from '../../components/Models/Globals';
import { COLORS } from '../../components/Models/Globals';
import PostLoader from '../GN/PostLoader';
import HomeFeedUtils from './HomeFeedUtils';
import HomeFeed from './HomeFeed';

export default function HomePage({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: COLORS.background,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
    },
    body: {
      flex: 1,
      width: '100%',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GNAppBar />
      </View>
      <HomeFeed id={appUser.id}/>
    </SafeAreaView>
  );
}
