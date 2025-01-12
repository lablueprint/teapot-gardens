import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Notification from './homepage_components/notification';

const NotificationPage = () => {
  const notifications = [
      {
        title: "kimchi workshop",
        messageText: "go make kimchi with the kimchi shop today",
        time: "9:19 am, january 12",
      },
      {
        title: "go to farmers market",
        messageText: "they got lots of fruits and veggies, go support the farmers",
        time: "2:21 pm, january 2",
      },
      {
        title: "your garden has grown",
        messageText: "looks like you got some new tomatoes and cucumbers. go make yourself a snack ;)",
        time: "10:14 am, december 18"
      }
  ]
  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>I'm a notification page!!!</Text>
      <FlatList 
        data={notifications}
        renderItem={({ item }) => <Notification title={item.title} messageText={item.messageText} time={item.time}/>}
      />
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
  header: {
    fontSize: 20,
    padding: 10,
  },

});

export default NotificationPage;