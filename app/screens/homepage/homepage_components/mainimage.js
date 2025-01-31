import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Placeholder({ imageSource }) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <Text style={styles.text}>Hi Hubert, your plant is growing!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 30,
    fontWeight: 600,
    marginTop: 40,
    margin: 20,
    textAlign: 'center',
    color: '#000000',
    width: '60%',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  circle: {
    width: 500, 
    height: 500,
    borderRadius: 250, 
    backgroundColor: '#EFEFEF', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});
