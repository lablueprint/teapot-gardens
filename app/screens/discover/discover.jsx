import {React, useState, useEffect} from 'react';
import { useNavigation } from 'expo-router';
import { Text, StyleSheet, ScrollView, View, Image, Pressable } from 'react-native';
import axios from 'axios';
import defaultPic from '@assets/default.png';
import discover from '@assets/discover.png';
import upcoming from '@assets/upcoming.png';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function DiscoverPage () {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);
    const [grid, setGrid] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/events/');
            if (response.status === 200) {
              setEvents(response.data);
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
              const response = await axios.get('http://localhost:4000/api/programs/');
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

          const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users/678f3a6bc0368a4c717413a8')
                if (response.status == 200) {
                    setUser(response.data);
                } else {
                    console.error('Failed to fetch user', response.data.error);
                }
            } catch (error) {
                console.error('failed to fetch user', error.message);
            } finally {
                setLoading(false);
            }
          }
        fetchEvents();
        fetchPrograms();
        fetchUser();
      }, []);

    const toggleGrid = () => {
        setGrid((prevGrid) => {
            return !prevGrid;
        });
    }

    return (
        <ScrollView>
            <View style={styles.pageContainer}>
                <Pressable onPress={toggleGrid}>
                    <Ionicons 
                        name={grid ? "grid-outline" : "tablet-portrait-outline"}
                        size={30} 
                        color="gray" 
                        style={styles.gridIcon} 
                    />
                </Pressable>
            <Text style={ styles.mainTitle}>Discover</Text>
            {/* <View>
                <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Search for events"
                    value={search}
                    onChangeText={setSearch}
                    />
            </View> */}
            <Text style={styles.subHeading}>Explore Program Pages</Text>
            <View>
                <ScrollView horizontal={grid}>
                {programs.map((program, index) => (
                    <Pressable 
                        key={index}
                        style={grid ? '' : styles.listProgramContainer}
                        onPress={() => navigation.navigate('ProgramPage')}
                        >
                        { grid ? (
                            <Image source={discover} style={styles.gridProgramImage} />
                        ): (
                            <>
                                <Image source={defaultPic} style={styles.listProgramImage}/>
                                <View style={styles.listText}>
                                    <Text>{program.name}</Text>
                                    <Text>{program.description}</Text>
                                </View>
                                <Pressable style={styles.followButton}>
                                    <Text style={{color: 'darkgreen'}}>Follow</Text>
                                </Pressable>
                                <Ionicons name="arrow-forward-outline" size={20} color="gray" style={styles.arrow}/>
                            </>
                        )
                        }
                    </Pressable>
                ))}
                </ScrollView>
                {/* create new program if admin*/}
                <View style={styles.createProgramContainer}>
                {
                user?.admin && (
                    <Pressable 
                    style={styles.createProgramButton}
                    onPress={() => navigation.navigate('CreateProgram')}
                    >
                    <Text style={styles.plusButton}>+</Text>
                    </Pressable>
                )
                }
                </View>
            </View>
            <View>
                <Text style={styles.mainTitle}>Upcoming Events</Text>
                <Text style={styles.subHeading}>Explore upcoming events</Text>
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
                            <Image source={upcoming} style={styles.upcomingImage}/>
                            {/* <View style={styles.eventInfoBox}>
                                <Text style={styles.eventName}>{event.name}</Text>
                                <Text style={styles.eventDescription}>{event.eventDescription}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Ionicons name="location" size={20} color="gray" />
                                    <Text style={styles.eventLocation}>{event.location}</Text>
                                </View>
                                <Text style={styles.eventTag}>Program Associated</Text>
                            </View> */}
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
        fontSize: 15, 
        fontStyle: 'italic',
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
        marginTop: 10,
        borderWidth: 1, 
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: 15
    },
    eventInfoBox: {
        padding: 10,
    },
    upcomingImage: {
        height: 200, 
        width: 300,
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
    gridProgramImage: {
        height: 390, 
        width: 250,
    },
    listProgramContainer: {
        borderWidth: 1, 
        borderColor: 'gray',
        borderRadius: 10,
        height: 80,
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center', 
    },
    listProgramImage: {
        height: 60, 
        width: 60,
        marginRight: 10,
    }, 
    listText: {
        width: 140,
    },
    followButton: {
        borderRadius: 15, 
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderColor: 'darkgreen',
        marginRight: 15,
    },
    createProgramButton: {
        borderWidth: 1, 
        borderRadius: 100, 
        backgroundColor: 'black', 
        position: 'absolute', 
        paddingHorizontal: 10, 
        paddingVertical: 6,
        right: 0,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    plusButton: {
        color: 'white', 
        fontWeight: 'bold',         
    },
    createProgramContainer: {
        padding: 10,
        marginTop: 10,
        height: 50,
    },
});