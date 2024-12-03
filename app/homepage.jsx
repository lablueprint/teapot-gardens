import React from 'react';
import { View, StyleSheet } from 'react-native';
import Placeholder from './homepage_components/Placeholder';
import CustomCarousel from './homepage_components/carousel';
import { upcomingEvents, programPages } from './homepage_components/data';
import sample_logo from '../assets/sample_logo.png';

export default function Homepage() {
  return (
    <View style={styles.main_container}>
        <Placeholder imageSource={sample_logo} />
      <View style={styles.carousel_container}>
        <CustomCarousel data={upcomingEvents} />
      </View>
      <View style={styles.carousel_container}>
        <CustomCarousel data={programPages} />
      </View>
    </View>
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
