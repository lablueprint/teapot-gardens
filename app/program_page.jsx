import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import React, { useState } from "react";
import Event from './event';
import styles from './program_page_style';
import garden from '../assets/garden.jpg';
import garden2 from '../assets/garden2.jpg';
import notAIGarden from '../assets/notAIGarden.jpg';
import Collapsible from 'react-native-collapsible';
import eventData from './eventData.json';

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

  const toggleCollapsedGoals = () => {
    setIsCollapsedGoals((prevState) => !prevState);
  }
  const toggleCollapsedActivities = () => {
    setIsCollapsedActivities((prevState) => !prevState);
  }

  return (
    <ScrollView contentContainerStyle={ styles.outerContainer }>
      <Text style={ styles.programTitle }>Garden Sundaze</Text>

      <View style={ styles.contentContainer }>
      <Text style={ styles.header }>Background</Text>
        <Text style={ styles.content }>
          Garden Sundaze is an organization that likes to garden and grow tomatoes!
        </Text>
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

      {/*  Upcoming Events Carousel  */}
      <Text style={ styles.header }>Upcoming Events</Text>
      <ScrollView horizontal={ true } style={ styles.carouselContainer }>
        <View style={ styles.carouselContainer }>
          {eventData.events.map((event, index) => (
              <Event {...event} key={index}/>
            ))}
        </View>
      </ScrollView>

      {/*  Past Events Carousel  */}
      <Text style={ styles.header }>Past Events</Text>
      <ScrollView horizontal={ true } style={ styles.carouselContainer }>
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
      </ScrollView>


    </ScrollView>
  );
};

export default ProgramPage;