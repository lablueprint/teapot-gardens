import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import pichu from '@assets/pichu.jpg';
import pikachu from '@assets/pikachu.jpg';
import raichu from '@assets/raichu.jpg';
import notAIGarden from '@assets/notAIGarden.jpg';
import welcomepage from '@assets/welcome_page.png';
import BackIcon from '@assets/favicon.png'
import { executeNativeBackPress } from 'react-native-screens';
import { Dimensions } from 'react-native';

const OnboardingCarousel = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide ] = useState(0);

    const handleFinish = () => {
        onComplete();
    };

    const slides = [
        {
            id: 1,
            title: 'Welcome to Teapot Gardens',
            image: welcomepage
        },
        {
            id: 2,
            title: 'Evolve your Garden',
            image: pikachu
        },
        {
            id: 3,
            title: 'Sign up for socials',
            image: raichu
        },
        {
            id: 4,
            title: 'Thanks for joining',
            image: notAIGarden
        }
    ];

    const handleNext = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length -1 ));
    };

    const handleBack = () => {
        setCurrentSlide((prev) => Math.max(prev-1, 0));
    };

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    const handleSkip = () => {
      setCurrentSlide(slides.length -1);
    };

    const handleCreateAccount = () => {
        console.log('Redirecting to Login Page');
    };

    return (
        <View style={styles.container}>
        <Image source={slides[currentSlide].image} style={styles.backgroundImage} resizeMode="cover" />
            <View style={styles.carouselWrapper}>
              {/* back button */}
                {currentSlide > 0 && (
                    <TouchableOpacity
                    onPress={handleBack}
                    style={styles.backButton}
                    >
                      <Text>Back</Text>
                    {/* <BackIcon size={24} color="#000" /> */}
                    </TouchableOpacity>
                )}
            <View style={styles.dotsContainer}>
                {slides.map((_, index) => (
                    <TouchableOpacity
                    key={index}
                    onPress={() => handleDotClick(index)}
                    style={[
                        styles.dot,
                        currentSlide === index && styles.dotActive
                    ]}
                    />
                ))}
            </View>
               
               <View style={styles.slideContent}>
                <View style={styles.slideHeader}>
                    <View style={styles.slideNumber}>
                        <Text style={styles.slideNumberText}>{slides[currentSlide].id}</Text>
                    </View>
                        <Text style={styles.slideTitle}>{slides[currentSlide].title}</Text>
                </View>
                {/* <Image
            source={slides[currentSlide].image}
            style={styles.slideImage}
            resizeMode="contain"
            onError={(e) => console.log('image error:', NativeEventEmitter.error)}
          /> */}
          {currentSlide != slides.length -1 && <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
              >
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleNext}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
             </View>}
           {currentSlide === slides.length -1 && ( 
            <View style={styles.getStartedContainer}>
            <TouchableOpacity onPress={handleFinish}
              style={styles.getStartedButton}>
                <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
            </View>
        )}
        </View>
      </View>
    </View>
    );
};
const windowHeight = Dimensions.get('window').height;

export default OnboardingCarousel;


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  carouselWrapper: {
      flex: 1,
      position: 'relative',
  },
  backButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 10,
  },
  dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 20,
      left: 0,
      right: 0,
  },
  dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#D1D5DB',
      marginHorizontal: 4,
  },
  dotActive: {
      backgroundColor: '#000',
  },
  slideContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 60,
  },
  slideHeader: {
      alignItems: 'center',
      marginBottom: 32,
  },
  slideNumber: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F3F4F6',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
  },
  slideNumberText: {
      fontSize: 16,
      color: '#000',
  },
  slideTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#000',
  },
  slideImage: {
      width: 250,
      height: 250,
      marginVertical: 30,
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
    gap: 12,
    marginTop: 'auto',  
    marginBottom: 50,  
},
skipButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
},
continueButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#000',
    color: 'white'
},
continueButtonText: { 
  fontSize: 16,
  color: '#FFF',     
},
getStartedContainer: {
    bottom: 20,
    width: '100%',
    marginTop: 'auto',
    marginBottom: '50',
    alignItems: 'center',
},
getStartedButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
    alignItems: 'center',
},
getStartedText: {
    fontSize: 16,
    color: '#000',
}
});