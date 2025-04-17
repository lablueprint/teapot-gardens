import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import Placeholder from './homepage_components/mainimage';
import EventCard from './homepage_components/eventcard';
import { programPages, upcomingEvents } from './homepage_components/data';
import sample_logo from '@assets/sample.png';
import pichu from '@assets/pichu.jpg';
import pikachu from '@assets/pikachu.jpg';
import raichu from '@assets/raichu.jpg';
import User from 'backend/models/UserModel';

export default function Homepage() {
  const [userData, setUserData] = useState(null);
  const [userAttendingEvents, setUserAttendingEvents] = useState([]);

  const [testEvent, setTestEvent] = useState(null);

  const [loading, setLoading] = useState(true);
  let level_img = sample_logo;
  const tempUserId = '6789f49f8e0a009647312c7a';
  const tempEventId = '67932a72413f4d68be84e592';

  const today = new Date();
  const currentDate = today.toISOString().split('T')[0];
  const currentYear = today.getFullYear();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const currentDay = today.getDate().toString().padStart(2, '0'); 
  const currentTime = today.toTimeString().split(' ')[0].slice(0, 5).split(':')[0] + today.toTimeString().split(' ')[0].slice(0, 5).split(':')[1];
  const months = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  }
  // console.log(currentYear, currentMonth, currentDay, currentTime); 
  let eventdate, eventtime, eventmonth, eventday, eventyear, eventAMPM;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // fetching user data here
        const userResponse = await axios.get('https://9cad-2607-f010-2a7-103f-bd39-11f5-b4e8-a209.ngrok-free.app/api/users/6789f49f8e0a009647312c7a');
        const testResponse = await axios.get('https://9cad-2607-f010-2a7-103f-bd39-11f5-b4e8-a209.ngrok-free.app/api/events/678f315b8d423da67c615e95');
        setTestEvent(testResponse);
  
        if (userResponse.status === 200) {
          setUserData(userResponse.data);
          setUserAttendingEvents(userResponse.data.attendingEvents);
          for (let event of userResponse.data.attendingEvents) {
            const eventDate = await axios.get('https://9cad-2607-f010-2a7-103f-bd39-11f5-b4e8-a209.ngrok-free.app/api/events/' + event);
            // event date formatted like "February 20th 2024"
            // event time formatted like "3:00 PM"
            eventAMPM = eventDate.data.time.split(' ')[1];
            eventtime = eventDate.data.time.split(' ')[0].split(':')[0] + eventDate.data.time.split(' ')[0].split(':')[1];
            if (eventAMPM === 'PM') {
              eventtime = parseInt(eventtime) + 1200;
            }
            eventdate = eventDate.data.date;
            eventmonth = months[eventDate.data.date.split(' ')[0]];
            eventday = eventDate.data.date.split(' ')[1].replace(/\D/g, '');
            eventyear = eventDate.data.date.split(' ')[2];
            // console.log(eventDate.data.title, eventdate, eventtime, eventmonth, eventday, eventyear, eventAMPM);
            if (currentYear > eventyear) {
              // event is in the past fs
              //I NEED HELP WITH THIS PART
              console.log(userResponse.data.attendingEvents, event);
              await axios.patch('https://9cad-2607-f010-2a7-103f-bd39-11f5-b4e8-a209.ngrok-free.app/api/users/' + userResponse.data._id, {
                attendedEvents: [...userResponse.data.attendedEvents, event],
                attendingEvents: userResponse.data.attendingEvents.filter(e => e !== event)
              });
              console.log("DONE");
            }
            else if (currentYear === eventyear) {
              if (currentMonth > eventmonth) {
                // event is in the past fs
              }
              else if (currentMonth === eventmonth) {
                if (currentDay > eventday) {
                  // event is in the past fs
                }
                else if (currentDay === eventDay) {
                  if (currentTime > eventtime) {
                    // event is in the past fs
                  }
                  else {
                    //its a future event
                  }
                }
              }
            }
          }



        } else {
          console.warn("No attending events found for the user");
          setUserAttendingEvents([]);
        }
      } catch (error) {
        console.error('Error fetching user or events: ', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  
  if (userData && userData.tamagatchiXP !== undefined) {
    if (userData.tamagatchiXP < 1000) {
      level_img = pichu;
    } else if (userData.tamagatchiXP <= 2000) {
      level_img = pikachu;
    } else {
      level_img = raichu;
    }

  }



  return (
    <ScrollView style={styles.main_container}>
      <Text style = {styles.title}> Your Teapot Garden </Text>
      <Placeholder imageSource={level_img} />
      <Text style = {styles.subtitle}> Upcoming Events </Text>
      <View style={styles.events_container}>
        {userAttendingEvents.map((event, index) => (
          <EventCard key={index} title={event.title} time={event.time} date={event.date} location={event.location} image={event.image} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 40,
    textAlign: 'center',
    color: '#737373',
    marginBottom: 50
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: 600,
    marginTop: 40,
    margin: 20,
    textAlign: 'left',
    color: '#000000'
  },
  main_container: {
    flex: 1,
    backgroundColor: '#FCFCFC'
  },
  events_container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  
});
