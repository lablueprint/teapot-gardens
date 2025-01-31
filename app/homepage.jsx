import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import Placeholder from './homepage_components/Placeholder';
import CustomCarousel from './homepage_components/carousel';
import { upcomingEvents, programPages } from './homepage_components/data';
import sample_logo from '../assets/sample_logo.png';
import pichu from '../assets/pichu.jpg';
import pikachu from '../assets/pikachu.jpg';
import raichu from '../assets/raichu.jpg';


export default function Homepage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/6789f49f8e0a009647312c7a');
        
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error('Failed to fetch user: ', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching user: ', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  
  let level_img = sample_logo;
  
  if (user && user.tamagatchiXP !== undefined) {
    if (user.tamagatchiXP < 1000) {
      level_img = pichu;
    } else if (user.tamagatchiXP <= 2000) {
      level_img = pikachu;
    } else {
      level_img = raichu;
    }
  }

  return (
    <View style={styles.main_container}>
      <Placeholder imageSource={level_img} />
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

