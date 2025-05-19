import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Pressable, Dimensions, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Event from '@screens/program_page/event';
import sample_logo from '@assets/sample.png';
import pichu from '@assets/pichu.jpg';
import pikachu from '@assets/pikachu.jpg';
import raichu from '@assets/raichu.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@app/context/AuthContext';

import gardenBG    from '@assets/garden-assets/garden-background.png';
// -- Assets for Plant 1 ---------------------------------------------
import plant_1_level_1 from '@assets/garden-assets/plant_1/plant_1_level_1.png';
import plant_1_level_2 from '@assets/garden-assets/plant_1/plant_1_level_2.png';
import plant_1_level_3 from '@assets/garden-assets/plant_1/plant_1_level_3.png';

// -- Assets for Plant 2 ----------------------------------------------
import plant_2_level_1 from '@assets/garden-assets/plant_2/plant_2_level_1.png';
import plant_2_level_2 from '@assets/garden-assets/plant_2/plant_2_level_2.png';
import plant_2_level_3 from '@assets/garden-assets/plant_2/plant_2_level_3.png';

// -- Assets for Plant 3 ----------------------------------------------
import plant_3_level_1 from '@assets/garden-assets/plant_3/plant_3_level_1.png';
import plant_3_level_2 from '@assets/garden-assets/plant_3/plant_3_level_2.png';
import plant_3_level_3 from '@assets/garden-assets/plant_3/plant_3_level_3.png';

const url = 'http://localhost:4000'

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Homepage() {
  const { user } = useContext(AuthContext);

  // I added this - daniel 
  const tempUserId = '6789f49f8e0a009647312c7a';
  const tempEventId = '678f315b8d423da67c615e95';
  const userId = user?.userId || tempUserId;

  const [userData, setUserData] = useState(null);
  const [userAttendingEvents, setUserAttendingEvents] = useState([]);
  const [thisMonthEvents, setThisMonthEvents] = useState([]);
  const [testEvent, setTestEvent] = useState(null);

  const [loading, setLoading] = useState(true);
  let level_img = sample_logo;
  const [events, setEvents] = useState([]);
  const today = new Date();
  const currentYear = parseInt(today.getFullYear());
  const currentMonth = parseInt((today.getMonth() + 1).toString().padStart(2, '0'));
  const currentDay = parseInt(today.getDate().toString().padStart(2, '0')); 
  const currentTime = parseInt(today.toTimeString().split(' ')[0].slice(0, 5).split(':')[0] + today.toTimeString().split(' ')[0].slice(0, 5).split(':')[1]);
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
  let eventdate, eventtime, eventmonth, eventday, eventyear, eventAMPM;

  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.log("Waiting for userId...");
        return;
      }
      try {
        // fetching user data here   
        const userResponse = await axios.get(`${url}/api/users/${tempUserId}`);
        const testResponse = await axios.get(`${url}/api/events/${tempEventId}`);
        setTestEvent(testResponse);
  
        if (userResponse.status === 200) {
          
          setUserData(userResponse.data);
          setUserAttendingEvents(userResponse.data.attendingEvents);
          for (let event of userResponse.data.attendingEvents) {
            const eventDate = await axios.get(`${url}/api/events/` + event);
            // event date formatted like "February 20th 2024"
            // event time formatted like "3:00 PM"
            eventAMPM = eventDate.data.time.split(' ')[1];
            eventtime = parseInt(eventDate.data.time.split(' ')[0].split(':')[0] + eventDate.data.time.split(' ')[0].split(':')[1]);
            if (eventAMPM === 'PM') {
              eventtime = parseInt(eventtime) + 1200;
            }
            eventmonth = parseInt(months[eventDate.data.date.split(' ')[0]]);
            eventday = parseInt(eventDate.data.date.split(' ')[1].replace(/\D/g, ''));
            eventyear = parseInt(eventDate.data.date.split(' ')[2]);
            if (currentYear > (eventyear)) {
              console.log(userResponse.data.attendingEvents, event);
              await axios.patch(`${url}/api/users/` + userResponse.data._id, {
                attendedEvents: [...userResponse.data.attendedEvents, event],
                attendingEvents: userResponse.data.attendingEvents.filter(e => e !== event)
              });
            }
            else if (currentYear === eventyear) {
              if (currentMonth > eventmonth) {
                // event is in the past fs
                await axios.patch(`${url}/api/users/` + userResponse.data._id, {
                attendedEvents: [...userResponse.data.attendedEvents, event],
                attendingEvents: userResponse.data.attendingEvents.filter(e => e !== event)
                });
              }
              else if (currentMonth === eventmonth) {
                // if event is in the same month then it is in this months events

                if (currentDay > eventday) {
                  // event is in the past fs
                  await axios.patch(`${url}/api/users/` + userResponse.data._id, {
                    attendedEvents: [...userResponse.data.attendedEvents, event],
                    attendingEvents: userResponse.data.attendingEvents.filter(e => e !== event)
                  });
                  console.log("HELLO");
                }
                else if (currentDay === eventday) {
                  if (currentTime > eventtime) {
                    // event is in the past fs
                    await axios.patch(`${url}/api/users/` + userResponse.data._id, {
                      attendedEvents: [...userResponse.data.attendedEvents, event],
                      attendingEvents: userResponse.data.attendingEvents.filter(e => e !== event)
                    });
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
  useEffect (() => {
    if (userAttendingEvents.length > 0) {
      populateEvents();
    }
  }, [userAttendingEvents, userId]);

  if (userData && userData.tamagatchiXP !== undefined) {
    if (userData.tamagatchiXP < 1000) {
      level_img = pichu;
    } else if (userData.tamagatchiXP <= 2000) {
      level_img = pikachu;
    } else {
      level_img = raichu;
    }
  }

  const populateEvents = async () => {
    try {
      const eventPromises = userAttendingEvents?.map(eventId => axios.get(`${url}/api/events/${eventId}`));
      const eventResponses = await Promise.all(eventPromises);
      const events = eventResponses.map(response => response.data);
      setEvents(events);
      const monthEvents = events.filter(event => {
        const [monthStr, dayStr, yearStr] = event.date.split(' ');
        const eventMonth = parseInt(months[monthStr]);
        const eventYear = parseInt(yearStr);
        return eventMonth === currentMonth && eventYear === currentYear;
      });
      setThisMonthEvents(monthEvents);
    } catch (error) {
      console.error('Error fetching events: ', error.message);
    }
  }

return (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* ---------- Pet card ---------- */}
      <View style={styles.petCard}>

        {/* ---------- Garden Background Image ---------- */}
        <Image source={gardenBG} style={styles.croppedPetImg} resizeMode="cover" />

        {/* ---------- Flower Text ---------- */}
        <Text style={styles.levelAbove}>Grey is looking good!</Text>
        {/* ---------- Centered Flower Image ---------- */}
          <Image
            source={plant_1_level_1} // ⬅️ use the flower image path
            style={styles.centeredFlower}
            resizeMode="contain"
          />
        {/* ---------- Flower Level  Text ---------- */}
          <Text style={styles.levelBelow}>LVL. 1</Text>
      </View>
        {/* ---------- Upcoming Events ---------- */}
        <Text style={styles.sectionHdr}>My Upcoming Events</Text>

        {events.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              Looks like you don't have any events yet!
            </Text>
            <Text style={styles.emptySub}>
              Come back here to view registered events
            </Text>
            <Ionicons
              name="leaf-outline"
              size={28}
              color="#8d9282"
              style={{ marginTop: 12 }}
            />
          </View>
        ) : (
          /* -------------- Carousel (exactly one card per swipe) -------------- */
          <FlatList
            data={events}
            horizontal
            pagingEnabled               
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id ?? String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.carouselCard}>
                <Event {...item} />
              </View>
            )}
          />
        )}

      {/* ---------- This Month's Events ---------- */}
        <Text style={styles.sectionHdr}>This Month's Events</Text>

        {events.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              Looks like you don't have any events yet for this Month!
            </Text>
            <Text style={styles.emptySub}>
              Come back here to view registered events
            </Text>
            <Ionicons
              name="leaf-outline"
              size={28}
              color="#8d9282"
              style={{ marginTop: 12 }}
            />
          </View>
        ) : (
          /* -------------- Carousel (exactly one card per swipe) -------------- */
          <FlatList
            data={thisMonthEvents}
            horizontal
            pagingEnabled               
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id ?? String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.carouselCard}>
                <Event {...item} />
              </View>
            )}
          />
        )}

      {/* ---------- Subscriptions ---------- */}
      <Text style={styles.sectionHdr}>Subscriptions</Text>
      <View style={styles.subRow}>
        <View style={styles.subIconWrap}>
          <Ionicons name="star-outline" size={22} color="#8d9282" />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.subTitle}>Keep track of your programs!</Text>
          <Text style={styles.subDesc}>
            Follow programs to stay up to date.
          </Text>
        </View>
      </View>
    </ScrollView>
  </View>
);
}

/* ========================= Styles ========================= */
const ACCENT   = '#9AA96D';

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#F1F2E6',
  padding: 20,           
},

/* ----- Pet card ----- */
petCard: {
  height: 300,
  borderRadius: 12,
  overflow: 'hidden',
  marginBottom: 24,
  marginTop: 80, 

},
  croppedPetImg: {
    width: "100%",
    height: '100%',
    position: 'absolute',
    top: 15,     // adjust vertically (negative = show lower)
    left: -30,    // adjust horizontally (negative = show right)
    transform: [{ scale: 1.3 }],  // optional zoom for detail
  },
    centeredFlower: {
    position: 'absolute',
    width: 165,
    height: 165,
    top: 30, // same pattern
    left: 50, // same pattern
    transform: [{ translateX: 70 }, { translateY: 90 }],
    zIndex: 2,
  },
  levelAbove: {
  position: 'absolute',
  top: 130, // same pattern
  left: 135, // same pattern
  color: '#000',        // or white if needed
  fontSize: 14,
  fontWeight: '600',
  zIndex: 3,
  color: "white"
},
  levelBelow: {
  position: 'absolute',
  top: 270, // same pattern
  left: 175, // same pattern
  fontSize: 14,
  fontWeight: '600',
  zIndex: 3,
  color: 'white'
},
outsideGradient: {
  height: 80,
  width: '100%',
  marginTop: -40,   // pull it up to overlap the petCard bottom
  zIndex: 0,
},
petOverlay: { flex: 1, padding: 14, justifyContent: 'space-between' },
petTitle:   { color: '#fff', fontSize: 20, fontWeight: '600' },
petSub:     { color: '#fff', fontSize: 12, lineHeight: 18 },
petLvl:     { color: '#fff', fontSize: 12 },

/* ----- Buttons / headings ----- */
enterBtn: {
  backgroundColor: ACCENT,
  borderRadius: 8,
  height: 48,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 40,
},
enterTxt:  { color: '#fff', fontSize: 18, fontWeight: '600' },
sectionHdr:{ fontSize: 24, fontWeight: '600', fontStyle: 'italic',
             marginTop: 20, color: '#000' },

/* ----- Empty state ----- */
emptyCard: {
  backgroundColor: '#E8E9D8',
  borderColor:     '#D0D4B6',
  borderWidth: 1,
  borderRadius: 6,
  paddingVertical:   32,
  paddingHorizontal: 12,
  alignItems: 'center',
},
emptyTitle:{ fontSize: 16, color: '#5c5c5c', textAlign: 'center' },
emptySub:  { fontSize: 12, color: '#7c7c7c', marginTop: 4, textAlign: 'center' },

/* ----- Carousel card ----- */
carouselCard: {
  marginLeft: 20            
},
events_container: {
  flexDirection: 'row',
  marginBottom: 20,
  paddingVertical: 10,
  marginLeft: 3,
},

/* ----- Subscriptions ----- */
subRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 50},
subIconWrap: {
  width: 56, height: 56, borderRadius: 28,
  borderWidth: 1.5, borderColor: ACCENT,
  justifyContent: 'center', alignItems: 'center',
},
subTitle:{ fontSize: 14, color: '#444' },
subDesc: { fontSize: 12, color: '#888' },
});