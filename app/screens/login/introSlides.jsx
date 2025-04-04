import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingCarousel from './OnboardingCarouselComp';

const ONBOARDING_KEY = 'hasSeenOnboardingV2';

const IntroSlides = () => {
  const navigation = useNavigation();

  const handleOnboardingComplete = async () => {
    try {
      console.log("Onboarding complete, saving to AsyncStorage with key:", ONBOARDING_KEY);
      
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      
      const savedValue = await AsyncStorage.getItem(ONBOARDING_KEY);
      console.log("Verified saved value:", savedValue);
      
      console.log("Navigating to Login screen");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
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