import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import Placeholder from './homepage_components/Placeholder';
import CustomCarousel from './homepage_components/carousel';
import { upcomingEvents, programPages } from './homepage_components/data';
import sample_logo from '../assets/sample_logo.png';
import pichu from '../assets/pichu.jpg';
import pikachu from '../assets/pikachu.jpg';
import raichu from '../assets/raichu.jpg';
import axios from 'axios';

export default function Homepage() {
  const testUserId = 1

  const [userXP, setUserXP] = useState(0);
  const [tamagatchiImage, setTamagatchiImage] = useState('')

  useEffect(() => {
    getTamagatchiXP();
  })

  // TODO: NOT YET TESTED
  // TODO: add getEvents function

  const getTamagatchiXP = async () => {
    const user = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/getUser`, { params: { id: testUserId } });
    setUserXP(user.tamagatchiXP)
    // console.log(userXP)

    if (userXP < 1000) {
      setTamagatchiImage(pichu);
    } else if (userXP <= 2000) {
      setTamagatchiImage(pikachu);
    } else {
      setTamagatchiImage(raichu);
    }
  }

  return (
    <View style={styles.main_container}>
        <Placeholder imageSource={tamagatchiImage} />
      <View style={styles.carousel_container}>
        <CustomCarousel data={upcomingEvents} />
      </View>
      <View style={styles.carousel_container}>
        <CustomCarousel data={programPages} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carousel_container: {
    flex: 1,
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});
