import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Pressable, StyleSheet, Alert, Modal, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Collapsible from "react-native-collapsible";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from 'expo-router';
import RegisterModal from './register_modal.jsx'
import Paradise from "@assets/paradise.png";
import dateIcon from "@assets/date-icon.png";
import locationIcon from "@assets/location-icon.png";

import pichu from '@assets/pichu.jpg';
import pikachu from '@assets/pikachu.jpg';


const mediaItems = [
    {
        id: '1',
        name: "Japanese Garden",
        image: pichu,
        type: 'photo',
    },
    {
        id: '2',
        name: "garden 2",
        image: pikachu,
        type: 'video',
    },
    {
      id: '3',
      name: "garden 3",
      image: pichu,
      type: 'photo',
  },
  {
    id: '4',
    name: "garden 4",
    image: pichu,
    type: 'photo',
},
  

];

const CommunityPhotos = () => {
  return (
    <View style={styles.container}>
        <Text>Community Photos</Text>
                <View style={styles.photoGalleryContainer}>
                    {mediaItems.map((item, index) => <Image key={index} source={item.image} style={styles.galleryPhoto}/>)}
                  </View>
    </View>
    
  );
};

const styles = StyleSheet.create({ 
    container: {
      paddingVertical: 16,
      paddingHorizontal: 30,
      backgroundColor: "#E9E5DA",
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      overflow: "hidden",
    },
    photoGalleryContainer: {
      display: "flex", 
      flexDirection: "row", 
      justifyContent: "space-between", 
      backgroundColor: "gray",
      padding: 10,
      marginTop: 10,
    }, 
    galleryPhoto: {
      width: 70, 
      height: 70, 
      borderRadius: 5
    }
})

export default CommunityPhotos;