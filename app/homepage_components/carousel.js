// Carousel.js
import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default function CustomCarousel({ data }) {
  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {data.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{item.time}</Text>
            <Text style={styles.details}> {item.details}</Text>
          </View>
        ))}
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