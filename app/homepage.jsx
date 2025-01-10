import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Placeholder from './homepage_components/Placeholder';
import CustomCarousel from './homepage_components/carousel';
import { upcomingEvents, programPages, notificationData } from './homepage_components/data';
import sample_logo from '../assets/sample_logo.png';
import Notification from './homepage_components/notification';

export default function Homepage() {
  return (
    <ScrollView>
    <View style={styles.main_container}>
        <Placeholder imageSource={sample_logo} />
      <View style={styles.carousel_container}>
        <CustomCarousel data={upcomingEvents} />
      </View>
      <View style={styles.carousel_container}>
        <CustomCarousel data={programPages} />
      </View>
      
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carousel_container: {
    flex: 1,
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});
