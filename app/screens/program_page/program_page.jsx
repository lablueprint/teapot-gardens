import { Text, View, Image, ScrollView, Pressable, ViewComponent } from "react-native";
import { Link } from "expo-router";
import { useNavigation } from "expo-router";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Event from './event';
import styles from './program_page_style';
import programBg from '@assets/program-bg.png'
import garden from '@assets/garden.jpg';
import garden2 from '@assets/garden2.jpg';
import Collapsible from 'react-native-collapsible';
import ProgramCard from "@screens/event/program_card";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import community1 from '@assets/community1.png';
import community2 from '@assets/community2.png';

const url = "http://localhost:4000";

const BulletPoints = (props) => {
  return (
    <View style={ styles.bulletContainer }>
      {props.items.map((item, index) => (
        <Text key={index}>
          {'\u2022'} {item}
        </Text>
      ))}
    </View>
  )
};

const ProgramPage = () => {
  const navigation = useNavigation();

  const goals = ['make garden', 'grow tomatoes']
  const activities = ['grow strawberries', 'plant trees']
  const [isCollapsedGoals, setIsCollapsedGoals] = useState(true);
  const [isCollapsedActivities, setIsCollapsedActivities] = useState(true);
  const [user, setUser] = useState(null); 
  const [program, setProgram] = useState(null);
  const [pastEvents, setPastEvents] = useState();
  const [pastPictures, setPastPictures] = useState([]); 

  const [upcomingEvents, setUpcomingEvents] = useState([]);


  const route = useRoute();
  const programData = route.params?.programData;
  console.log('program page data', programData);

  const toggleCollapsedGoals = () => {
    setIsCollapsedGoals((prevState) => !prevState);
  }
  const toggleCollapsedActivities = () => {
    setIsCollapsedActivities((prevState) => !prevState);
  }

  const handleCreateEvent = () => {
    console.log('hi');
  }
  
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
  }
  ];

  // parse programdata
  useEffect(() => {
    if (programData) {
      try {
        const parsed = JSON.parse(programData);
        setProgram(parsed);
        console.log("programData", programData);
      } catch (err) {
        console.error("Error parsing programData:", err);
        setProgram(null);
      }
    } else {
      setProgram(null);
    }
  }, [programData]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      if (!program || !program.upcomingEvents) return;
  
      try {
        const responses = await Promise.all(
          program.upcomingEvents.map(id =>
            axios.get(`${url}/api/events/${id}`)
          )
        );
        const events = responses.map(res => res.data);
        setUpcomingEvents(events);
      } catch (err) {
        console.error("Error fetching upcoming events:", err);
      }
    };
  
    fetchUpcomingEvents();
  }, [program]);
  
  
  // get program's pastEvent array
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${url}/api/users/678f3a6bc0368a4c717413a8`);
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
    const fetchEventsWithPictures = async () => {
      try {
        // First fetch past events
        const response = await axios.get(`${url}/api/programs/past-events/6789ed54a5e1c0261cefac4f`);
        
        if (response.status === 200) {
          const eventIds = response.data;
          setPastEvents(eventIds);
          try{
            const pictureResponses = await Promise.all(eventIds.map(id =>
              axios.get(`${url}/api/events/${id}`)
            ));
            
            setPastPictures(prevPictures => {
              const updatedPictures = {...prevPictures};
              pictureResponses.forEach((response, index) => {
                const eventId = eventIds[index];
                const pictures = response.data.pictures; 
                updatedPictures[eventId] = [
                  ...(updatedPictures[eventId] || []), 
                  ...pictures
                ];
              });
              return updatedPictures;
            });
          } catch(error){
          console.error(error);
        }
        } 
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchUser();
    fetchEventsWithPictures();
  }, []);

  // get event's pictures

  return (
    <ScrollView contentContainerStyle={ styles.outerContainer }>
      {/* <Image 
        style={styles.banner}
        source={programBg}
      /> */}
      <View style={{ flex: 1 }}>
        <Image style={{ width: '100%', height: '250', resizeMode: "cover" }} source={programBg} />
      </View>
      <View style={ styles.contentContainer }>
        <View style={styles.infoContainer}>
          <Text style={ styles.programTitle }>{program?.name || 'Default'}</Text>
          <ProgramCard name="Sorina Varizi" profilePicture={garden}/>
          <Pressable onPress={ toggleCollapsedActivities } style={styles.button} >
            <Ionicons name="star-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Follow Program</Text>
          </Pressable>
          <Text style={styles.header}>About {program?.name}</Text>
          <Text style={styles.description}>{program?.description || 'Lorem Ipsum'}</Text>
          <Pressable>
            <Text style={{textDecorationLine: 'underline', marginBottom: 20}}>Read more</Text>
          </Pressable>
        </View>

        <View style={styles.photoGalleryContainer}>
          {mediaItems.map((item, index) => <Image key={index} source={item.image} style={styles.galleryPhoto}/>)}
        </View>

      {/*  Upcoming Events Carousel  */}
      <Text style={ styles.header }>Upcoming Events</Text>
        <View>
          <ScrollView horizontal={true} style={styles.upcomingBox}>
            {upcomingEvents.map((event, index) => (
              <Event {...event} key={index} />
            ))}
          </ScrollView>
          {/* create new event if admin */}
          <View style={styles.createEventContainer}>
            {
              user?.admin && (
                <Pressable 
                  style={styles.createEventButton}
                  onPress={() => navigation.navigate('CreateEvent')}
                  >
                  <Text style={styles.plusButton}>+</Text>
                </Pressable>
              )
            }
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProgramPage;