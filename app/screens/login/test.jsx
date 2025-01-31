// TestScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingCarousel from './OnboardingCarouselComp';

const TestScreen = () => {
  return (
    <View style={styles.container}>
      <OnboardingCarousel/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default TestScreen;