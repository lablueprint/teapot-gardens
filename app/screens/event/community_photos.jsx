import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from 'expo-router';
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

import community1 from '@assets/community1.png';
import community2 from '@assets/community2.png';
import upload from '@assets/upload.png';

const mediaItems = [
  {
    id: '1',
    name: "Japanese Garden",
    image: community1,
    type: 'photo',
  },
  {
    id: '2',
    name: "garden 2",
    image: community2,
    type: 'video',
  },
  {
    id: '3',
    name: "garden 3",
    image: community1,
    type: 'photo',
  },
  {
    id: '4',
    name: "garden 4",
    image: community2,
    type: 'photo',
  },
  {
    id: '5',
    name: "garden 5",
    image: community1,
    type: 'photo',
  },
  {
    id: '6',
    name: "garden 6",
    image: community2,
    type: 'photo',
  },
  {
    id: '7',
    name: "garden 7",
    image: community1,
    type: 'photo',
  },
  {
    id: '8',
    name: "garden 8",
    image: community2,
    type: 'photo',
  },
  {
    id: '9',
    name: "garden 9",
    image: community1,
    type: 'photo',
  },
  {
    id: '10',
    name: "garden 10",
    image: community2,
    type: 'photo',
  },
  {
    id: '11',
    name: "garden 11",
    image: community1,
    type: 'photo',
  },
  {
    id: '12',
    name: "garden 12",
    image: community2,
    type: 'photo',
  }
];



const CommunityPhotos = () => {
  const navigation = useNavigation();
  const [userImages, setUserImages] = useState([]);

  const route = useRoute();
  const eventData = route.params?.eventData;
  const attendedEvents = route.params?.attendedEvents; 
  const attendingEvents = route.params?.attendingEvents;
  const event = JSON.parse(eventData);

  console.log("community event data", eventData)
  console.log("community attended", attendedEvents)
  console.log("community attending", attendingEvents)

  const pickImage = async() => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Add the new image to userImages state
      setUserImages([...userImages, {
        id: `user-${Date.now()}`,
        name: "My Upload",
        uri: result.assets[0].uri,
        type: 'photo',
      }]);
    }
  }

  // Create combined array with all items to display
  const renderItems = () => {
    // Convert to array of components for consistent rendering
    let items = [];
    
    // Add upload button as first item
    const eventId = String(event?._id);
    console.log('event id', event?._id);
    if (attendingEvents.includes(eventId) || attendedEvents.includes(eventId))
    {
    items.push(
      <View key="upload" style={styles.photoWrapper}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Image source={upload}></Image>
          <Text style={styles.uploadButtonText}>Upload Your Own</Text>
        </TouchableOpacity>
      </View>
    )}
    
    // Add user uploaded images
    userImages.forEach((item, index) => {
      items.push(
        <View key={`user-${index}`} style={styles.photoWrapper}>
          <Image source={{ uri: item.uri }} style={styles.galleryPhoto} />
        </View>
      );
    });
    
    // Add pre-defined media items
    mediaItems.forEach((item, index) => {
      items.push(
        <View key={`media-${index}`} style={styles.photoWrapper}>
          <Image source={item.image} style={styles.galleryPhoto} />
        </View>
      );
    });
    
    return items;
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate({
                                    name: 'EventPage',
                                    params: { eventData: JSON.stringify(event) }, // converting the event object into a string json to pass it in
                                })}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Community Photos</Text>
      
      <View style={styles.photoGalleryContainer}>
        {renderItems()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#E9E5DA",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  backButton: {
    marginTop: 50,
    backgroundColor: 'white', 
    display: 'flex',
    borderRadius: 50,
    width: 30, 
    height: 30,
  },
  backButtonText: {
    marginTop: 5,
    color: 'black',
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  photoGalleryContainer: {
    flexDirection: "row", 
    flexWrap: "wrap",
    justifyContent: "space-between",
  }, 
  photoWrapper: {
    width: '31%',
    aspectRatio: 0.8,
    marginBottom: 12,
  },
  uploadButton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DFD8D0',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonIcon: {
    width: '60%',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  uploadButtonText: {
    fontSize: 11,
    width: '50%',
    textAlign: 'center', 
    color: 'black',
    opacity: 0.35,
    marginTop: 10
  },
  galleryPhoto: {
    width: '100%', 
    height: '100%', 
    borderRadius: 5,
  }
})

export default CommunityPhotos;