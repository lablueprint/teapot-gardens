import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Dimensions, Animated } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import axios from 'axios';
import plant from '@assets/plant.png';
import trash from '@assets/trash.png';
import { Feather } from '@expo/vector-icons';


export default function NotificationComponent({ description }) {
  const renderRightActions = () => (
    <RectButton style={styles.rightAction} onPress={() => console.log('delete')}>
        <Image source={trash} />
        {/* <Feather name="trash" size={24} color="#fff" /> */}
    </RectButton>
  );


  return (
    <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.container}>
            <Image source={plant} style={styles.plant}/>
            <Text style = {styles.description}>{description}</Text>
        </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  rightAction: {
    // borderColor: 'red',
    // borderStyle: 'solid',
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  plant: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    padding: 10,
  },
  description: {
    fontFamily: 'Inter',
    fontSize: 14,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#EAEAE4',
    borderRadius: 20,
    borderColor: "#0000000D",
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    alignItems: 'center',
  },
  
});
