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
{
  id: '5',
  name: "garden 3",
  image: pichu,
  type: 'photo',
},
{
id: '6',
name: "garden 4",
image: pichu,
type: 'photo',
},
{
  id: '7',
  name: "garden 4",
  image: pichu,
  type: 'photo',
  },
  

];

const CommunityPhotos = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('EventPage')}>
        <Text style={styles.backButtonText}>{"<"} Back </Text>
      </TouchableOpacity>
        <Text style={styles.title}>Community Photos</Text>
                <View style={styles.photoGalleryContainer}>
                    {mediaItems.map((item, index) => (
                      <View key={index} style={styles.photoWrapper}>
                      <Image  source={item.image} style={styles.galleryPhoto}/>
                      </View>
                      ))}
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
    backButtonText: {
      textDecorationLine: 'underline',
      color: 'grey',
    },
    title:{
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      marginTop: 10,
    },
    photoGalleryContainer: {
      display: "flex", 
      flexDirection: "row", 
      flexWrap: "wrap",
      justifyContent: "space-between", 
      width: '100%'

    }, 
    photoWrapper: {
      width: '31%',
      marginBottom: 10,
      marginHorizontal: 1,
    },
    galleryPhoto: {
      width: '100%', 
      height: '100', 
      borderRadius: 15,
    }
})

export default CommunityPhotos;