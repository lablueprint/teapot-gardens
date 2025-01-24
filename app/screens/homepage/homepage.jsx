import React from 'react';
import { View, StyleSheet } from 'react-native';
import Placeholder from '@screens/homepage/homepage_components/placeholder'
import Carousel from '@screens/homepage/homepage_components/carousel';
import { Uevents, Ppages } from '@screens/homepage/homepage_components/data';
import pichu from '@assets/pichu.jpg';
import pikachu from '@assets/pikachu.jpg';
import raichu from '@assets/raichu.jpg';


export default function Homepage() {
  const user = {
    xp: 0,
  }
  let level_img;
  if (user.xp < 1000) {
    level_img = pichu;
  } else if (user.xp <= 2000) {
    level_img = pikachu;
  } else {
    level_img = raichu;
  }
  return (
    <View style={styles.main_container}>
        <Placeholder imageSource={level_img} />
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
