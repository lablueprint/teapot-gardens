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
    const [user, setUser] = useState(null);

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

    const options = [
        { name: "Option"}, {name: "Option"}, {name: "Option"}, {name: "Option"}, {name: "Option"}
    ]

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
                            onPress={() => {
                                console.log("Navigating to EventPage with eventData:", event); // Log event before navigation
                                navigation.navigate({
                                    name: 'EventPage',
                                    params: { eventData: JSON.stringify(event) },
                                });                                                            }}>
                            <Image source={event.image ? { uri: event.image } : garden} style={styles.image}/>
                            <View style={styles.eventInfoBox}>
                                <Text style={styles.eventName}>{event.name}</Text>
                                <Text style={styles.eventDescription}>{event.eventDescription}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
    image: {
        height: 150, 
        width: 250,
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