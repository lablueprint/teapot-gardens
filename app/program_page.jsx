import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import Event from './event';
import styles from './program_page_style';
import garden from '../assets/garden.jpg';
import garden2 from '../assets/garden2.jpg';
import notAIGarden from '../assets/notAIGarden.jpg';

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
  return (
    <ScrollView contentContainerStyle={ styles.outerContainer }>
      <Text style={ styles.programTitle }>Garden Sundaze yay!</Text>

      {/*  Info  */}
      <View style={ styles.contentContainer }>
      <Text style={ styles.header }>Background</Text>
        <Text style={ styles.content }>
          Garden Sundaze is an organization that likes to garden and grow tomatoes!
        </Text>
        <Text style={ styles.header }>Goals</Text>
        <BulletPoints items={ goals } ></BulletPoints>
        <Text style={ styles.header }>Activites</Text>
        <BulletPoints items={ activities } ></BulletPoints>
      </View>

      {/*  Image Carousel  */}
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

      {/*  Upcoming Events Carousel  */}
      <Text style={ styles.header }>Upcoming Events</Text>
      <ScrollView horizontal={ true } style={ styles.carouselContainer }>
        <View style={ styles.carouselContainer }>
          <Event title='Reaping' date='September 10th'/>
          <Event title='Sowing' date='March 10th'/>
        </View>
      </ScrollView>

    </ScrollView>
  );
};

export default ProgramPage;