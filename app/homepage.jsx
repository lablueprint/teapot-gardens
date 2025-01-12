import React from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import Placeholder from './homepage_components/Placeholder';
import CustomCarousel from './homepage_components/carousel';
import { upcomingEvents, programPages } from './homepage_components/data';
import { Link } from "expo-router";
import sample_logo from '../assets/sample_logo.png';
import bellIcon from '../assets/dingdingsample-icon.png';

export default function Homepage() {
  return (
    <ScrollView>
      <View style={styles.main_container}>
        <View style={styles.header}>
          <Placeholder imageSource={sample_logo} />
          <Link href="/notificationPage" style={styles.bellContainer}>
            <Placeholder imageSource={bellIcon} />
          </Link>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20, 
    marginVertical: 10, 
  },
  bellContainer: {
    position: 'absolute', 
    right: 20, 
  },
  carousel_container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});