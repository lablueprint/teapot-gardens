// Carousel.js
import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import Event from './event';

export default function Carousel({ data }) {
  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
      {data.map((item, index) => (
        <Event index = {index} title = {item.title} time = {item.time} details={item.details}/>))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: width,
    backgroundColor: 'antiquewhite'
  },
  scrollViewContainer: {
    alignItems: 'center',
  },
  itemContainer: {
    width: width,
    alignItems: 'center',
  },
  title: {
    marginTop: 5,
    fontSize: 24,
    color: '#333',
  },
  details: {
    fontSize: 18,
    color: '#333',
  },
});
