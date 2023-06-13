import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavigatorTab from '../GN/NavigatorTab';
import GNAppBar from '../GN/GNAppBar';

const MainLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <GNAppBar />
        <View style={styles.content}>{children}</View>
      <NavigatorTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default MainLayout;
