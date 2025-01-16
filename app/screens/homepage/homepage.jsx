import React from 'react';
import { View, StyleSheet } from 'react-native';
import Placeholder from '@screens/homepage/homepage_components/placeholder'
import Carousel from '@screens/homepage/homepage_components/carousel';
import { Uevents, Ppages } from '@screens/homepage/homepage_components/data';
import Sample_Logo from '@assets/Sample_Logo.png';


export default function Homepage() {
  console.log("Uevents:", Uevents);
  console.log("Ppages:", Ppages);
  return (
    <View style={styles.main_container}>
        <Placeholder imageSource={Sample_Logo} />
      <View style={styles.carousel_container}>
        <Carousel data={Uevents} />
      </View>
      <View style={styles.carousel_container}>
        <Carousel data={Ppages} />
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
