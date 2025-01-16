import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Placeholder({ imageSource }) {
  return (
    <View style={styles.container}>
      {imageSource && <Image source={imageSource} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
