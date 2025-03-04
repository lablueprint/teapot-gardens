import {React, useState, useEffect} from 'react';
import { useNavigation } from 'expo-router';
import { Text, StyleSheet, ScrollView, View, Image, TextInput, Pressable } from 'react-native';
import garden from '@assets/garden.jpg';
import axios from 'axios';
import defaultPic from '@assets/default.png';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function DiscoverPage () {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const tempUserId = '678f3a6bc0368a4c717413a8';
    const API_KEY = 'http://localhost:4000';

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_KEY}/api/events/`);
                if (response.status === 200) {
                    const eventsWithLikeFlag = response.data.map(event => ({
                        ...event,
                        liked: event.likedBy.includes(tempUserId),
                        likes: event.likes || 0,
                    }));
                    setEvents(eventsWithLikeFlag);
                } else {
                    console.error('Failed to fetch events: ', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching events: ', error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchPrograms = async () => {
            try {
              const response = await axios.get(`${API_KEY}/api/programs/`);
              if (response.status === 200) {
                setPrograms(response.data);
              } else {
                console.error('Failed to fetch programs: ', response.data.error);
              }
            } catch (error) {
              console.error('Error fetching programs: ', error.message);
            } finally {
              setLoading(false);
            }
            
          };
        fetchEvents();
        fetchPrograms();
      }, []);

      const handleLike = async (eventId, index) => {
        try {
            const eventToUpdate = { ...events[index] }; 
        
            const response = await axios.patch(
                `${API_KEY}/api/events/like/${eventId}`,
                { userId: tempUserId }
            );
    
            if (response.status === 200) {
                const updatedEvent = {
                    ...eventToUpdate,
                    liked: response.data.likedBy.includes(tempUserId),
                    likes: response.data.likes,
                };
    
                setEvents(prevEvents => {
                    const updatedEvents = [...prevEvents];
                    updatedEvents[index] = updatedEvent;
                    return updatedEvents;
                });
            }
        } catch (error) {
            console.error("Error updating like:", error.response?.data || error.message);
        }
    };
    
    

    const options = [
        { name: "Option"}, {name: "Option"}, {name: "Option"}, {name: "Option"}, {name: "Option"}
    ];

    return (
        <ScrollView>
            <View style={styles.pageContainer}>
            <Text style={ styles.mainTitle}>Discover</Text>
            <View>
                <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Search for events"
                    value={search}
                    onChangeText={setSearch}
                    />
            </View>
            <ScrollView horizontal={true}>
                <View style={styles.optionContainer}>
                    {options.map((opt, index) => (
                        <Pressable key={index} style={styles.option}>
                            <Text>{opt.name}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            <View>
                <Text style={styles.subHeading}>Upcoming Events</Text>
                <ScrollView horizontal={true} style={styles.eventContainer}>
                    {events.map((event, index) => (
                        <Pressable 
                            key={index} 
                            style={styles.eventBox}
                            onPress={() => navigation.navigate('EventPage', 
                                { 
                                    title: event.name, 
                                    date: event.date,
                                    location: event.location, 
                                    time: event.time, 
                                    details: event.eventDescription 
                                })}
                            >
                            {/* <View>
                                <Text>{event.date}</Text>
                            </View> */}
                            <View style={styles.imageContainer}>
                                <Image source={garden} style={styles.image} />
                                <View style={styles.likeContainer}>
                                    <Ionicons
                                    name={event.liked ? 'heart' : 'heart-outline'}
                                    size={24}
                                    color={event.liked ? 'red' : 'gray'}
                                    onPress={() => handleLike(event._id, index)}
                                    />
                                    <Text style={styles.likeCount}>{event.likes}</Text>
                                </View>
                            </View>
                            <View style={styles.eventInfoBox}>
                                <Text style={styles.eventName}>{event.name}</Text>
                                <Text style={styles.eventDescription}>{event.eventDescription}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Ionicons name="location" size={20} color="gray" />
                                    <Text style={styles.eventLocation}>{event.location}</Text>
                                </View>
                                <Text style={styles.eventTag}>Program Associated</Text>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            <Text style={styles.subHeading}>Explore Program Pages</Text>
            <View>
                <ScrollView>
                {programs.map((program, index) => (
                    <Pressable 
                        style={styles.programContainer} 
                        key={index}
                        onPress={() => navigation.navigate('ProgramPage')}
                        >
                        <Image source={defaultPic} style={styles.programImage}/>
                        <Text>{program.description}</Text>
                        <Ionicons name="chevron-forward" size={20} color="gray" style={styles.arrow}/>
                    </Pressable>
                ))}
                </ScrollView>
            </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        padding: 16,
        gap: 10,
    },
    mainTitle:{
        fontSize: 30, 
        fontWeight: 'bold'
    }, 
    searchIcon: {
        position: 'absolute', 
        left: 12, 
        top: '50%', 
        transform: [{translateY: -9}],
    },
    searchInput: {
        borderWidth: 1, 
        borderRadius: 20, 
        padding: 8,
        flex: 1, 
        paddingLeft: 35,
    },
    subHeading: {
        fontSize: 20, 
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionContainer: {
        display: "flex", 
        flexDirection: "row", 
        paddingBottom: 10, 
        gap: 10
    },
    option: {
        borderWidth: 1, 
        paddingVertical: 10,
        paddingHorizontal: 15,  
        borderRadius: 20, 
    }, 
    eventContainer: {
        display: "flex", 
        flexDirection: "row", 
        marginBottom: 20,
    },
    eventBox: {
        borderWidth: 1, 
        width: 250,
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: 15
    },
    eventInfoBox: {
        padding: 10,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        height: 150,
        width: 250,
    },
    likeContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: 4,
        borderRadius: 12,
    },
    likeCount: {
        marginLeft: 4,
        fontSize: 16,
        color: 'black',
    },
    eventName: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginVertical: 3,
    }, 
    eventInformation: {
        fontSize: 15, 
        marginVertical: 5,
    }, 
    eventLocation: {
        fontSize: 14, 
        marginVertical: 5,
    },
    eventTag: {
        backgroundColor: 'lightgray', 
        fontWeight: 'bold',
        borderRadius: 10, 
        fontSize: 13,
        padding: 5,
        width: 200,
        marginVertical: 5,
    },
    programContainer: {
        borderWidth: 1, 
        borderRadius: 10,
        height: 80,
        marginBottom: 15,
        overflow: 'hidden',
        padding: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    programImage: {
        height: 60, 
        width: 60,
    }, 
    arrow: {
        position: 'absolute', 
        right: 40,
    }
});