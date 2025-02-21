import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');


export default function Event ({ index, title, time, details }) {
    return (
      <View>
            <View style={styles.itemContainer} key={index}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.title}>{time}</Text>
              <Text style={styles.details}> {details}</Text>
            </View>
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
  