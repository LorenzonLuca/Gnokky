import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import GNAppBar from '../GN/GNAppBar';
import { COLORS } from '../Models/Globals';

export default function Prova({ navigation }) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      padding: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.body}>
          <Text>MADONNA LAPIDATA</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}