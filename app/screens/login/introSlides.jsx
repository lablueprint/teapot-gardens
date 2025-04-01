import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingCarousel from './OnboardingCarouselComp';
import AsyncStorage from "@react-native-async-storage/async-storage";

// This component wraps the OnboardingCarousel and handles navigation
const IntroSlides = ({ navigation }) => {
  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error saving onboarding status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <OnboardingCarousel onComplete={handleOnboardingComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default IntroSlides;