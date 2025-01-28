import { Text, View, Image, ScrollView, Pressable, ViewComponent } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import Event from './event';
import styles from './program_page_style';
import garden from '../assets/garden.jpg';
import garden2 from '../assets/garden2.jpg';
import notAIGarden from '../assets/notAIGarden.jpg';
import Collapsible from 'react-native-collapsible';
import eventData from './eventData.json';
import axios from 'axios';

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
  const goals = ['make garden', 'grow tomatoes']
  const activities = ['grow strawberries', 'plant trees']
  const [isCollapsedGoals, setIsCollapsedGoals] = useState(true);
  const [isCollapsedActivities, setIsCollapsedActivities] = useState(true);
  const [pastEvents, setPastEvents] = useState();
  const toggleCollapsedGoals = () => {
    setIsCollapsedGoals((prevState) => !prevState);
  }
  const toggleCollapsedActivities = () => {
    setIsCollapsedActivities((prevState) => !prevState);
  }
  
  // get program's pastEvent array
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://c33e-2607-f010-2e9-8-1467-3c9d-9f4e-33a1.ngrok-free.app/api/programs/past-events/6789ed54a5e1c0261cefac4f');
        if (response.status === 200) {
          setPastEvents(response.data);
        } else {
          console.error('Failed to fetch past events: ', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching past events: ', error.message);
      } finally {
        setLoading(false);
      }
      
    };
    fetchImage();
  }, []);
  // get event's pictures

  return (
    <ScrollView contentContainerStyle={ styles.outerContainer }>
      <Image 
        style={styles.banner}
        source={garden}
      />
      <View style={ styles.contentContainer }>
        <Text style={ styles.programTitle }>Garden Sundaze</Text>
        <Text style={ styles.description }>
          Garden Sundaze is an organization that likes to garden and grow tomatoes!
        </Text>
        <Pressable onPress={ toggleCollapsedActivities } >
            <Text style={styles.button}>Follow Program</Text>
          </Pressable>

      {/*  Upcoming Events Carousel  */}
      <Text style={ styles.header }>Upcoming Events</Text>
        <View>
          <View>
          {eventData.events.map((event, index) => (
              <Event {...event} key={index}/>
            ))}

          </View>
        </View>

      {/*  Past Events Carousel  */}
      <Text style={ styles.header }>Past Events</Text>
      {/* <ScrollView horizontal={ true } style={ styles.carouselContainer }> */}
        <View style={ styles.carouselContainer }>
          <Image 
            style = { styles.image }
            source = { garden }
          />
          <Image 
            style = { styles.image }
            source = { garden2 }
          />
          <Image 
            style = { styles.image }
            source = { notAIGarden }
          />
        </View>
       {pastEvents && pastEvents.map((event, index) => (
          <Text key={index}>{event}</Text>
        ))}

        
      {/* </ScrollView> */}

      <View style={ styles.collapsible }>
          <Pressable onPress={ toggleCollapsedGoals } >
            <Text style={ styles.header }>Goals</Text>
          </Pressable>
          <Collapsible collapsed={ isCollapsedGoals } >
            <BulletPoints items={ goals } ></BulletPoints>
          </Collapsible>
        </View>
      <View style={ styles.collapsible }>
        <Pressable onPress={ toggleCollapsedActivities } >
          <Text style={ styles.header }>Activities</Text>
        </Pressable>
        <Collapsible collapsed={ isCollapsedActivities } >
          <BulletPoints items={ activities } ></BulletPoints>
        </Collapsible>
      </View>
      </View>
    </ScrollView>
  );
};

export default ProgramPage;