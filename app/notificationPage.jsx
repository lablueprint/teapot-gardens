import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationPage = () => {
  return (
    <View style={styles.container}>
      <Text>I'm a notification page!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default NotificationPage;