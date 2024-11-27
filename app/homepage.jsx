import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Page() {
  return (
    <View style={styles.main_container}>
      <Text>Placeholder</Text>
      {/* <Image source={} style={styles.image} resizeMode="contain" /> */}
      <View style={styles.carousel_container}>
        <Text>Carousel for Upcoming Events</Text>
      </View>
      <View style={styles.carousel_container}>
        <Text>Carousel for Program Pages</Text>
      </View>
    </View>
    
  );
}

// create a component for the place holder
// create a component for the carousel 
// create local data for upcoming events and program pages so we can feed it into carousel

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: 10,
    m
  },
  carousel_container: {
    backgroundColor: 'red',

  },
});

