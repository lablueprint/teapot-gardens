import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import PlantSelector from './PlantSelector_comp.js';

const plant = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <PlantSelector />
    </SafeAreaView>
  );
};

export default plant;