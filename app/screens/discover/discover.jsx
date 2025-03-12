import {React, useState, useEffect, useRef} from 'react';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import { Text, StyleSheet, ScrollView, View, Image, Pressable, Dimensions } from 'react-native';
import axios from 'axios';
import defaultPic from '@assets/default.png';
import discover from '@assets/discover.png';
import upcoming from '@assets/upcoming.png';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function DiscoverPage () {
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;
    const cardWidth = windowWidth * 0.7; 
    const cardSpacing = 10;

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

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / (cardWidth + cardSpacing));
        setActiveIndex(currentIndex);
    };

    const scrollToIndex = (index) => {
        scrollViewRef.current?.scrollTo({
            x: index * (cardWidth + cardSpacing),
            animated: true,
        });
        setActiveIndex(index);
    };

    const [fontsLoaded] = useFonts({
        'IMFell': require('../../../assets/fonts/IMFellGreatPrimer-Regular.ttf'),
        'IMFellItalic': require('../../../assets/fonts/IMFellGreatPrimer-Italic.ttf')
    }); 

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView>
            <View style={styles.pageContainer}>
                <View style={styles.toggleIcon}>
                    <Pressable onPress={toggleGrid}>
                        <Ionicons 
                            name={grid ? "grid" : "tablet-portrait"}
                            size={40} 
                            color="#D2D0D0" 
                            style={styles.gridIcon} 
                        />
                    </Pressable>
                </View>
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
                <ScrollView 
                    ref={scrollViewRef}
                    horizontal={grid}
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    snapToInterval={cardWidth}
                    style={styles.eventContainer}
                    >
                {programs.map((program, index) => (
                    <Pressable 
                        key={index}
                        style={[grid ? styles.gridProgramContainer : styles.listProgramContainer, grid ?  
                            {width: cardWidth, marginLeft: cardSpacing/2, marginRight: cardSpacing/2}: {}
                        ]}
                        onPress={() => navigation.navigate('ProgramPage')}
                        >
                        { grid ? (
                            <Image source={discover} style={styles.gridProgramImage} />
                        ): (
                            <>
                                <Image source={discover} style={styles.listProgramImage}/>
                                <View style={styles.listText}>
                                    <Text style={styles.listName}>{program.name}</Text>
                                    <Text style={styles.listDescription}>{program.description}</Text>
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
                { grid && (
                    <View style={styles.indicatorContainer}>
                        {programs.map((_, index) => (
                        <Pressable
                            key={index}
                            style={[
                            styles.indicator,
                            index === activeIndex ? styles.activeIndicator : styles.inactiveIndicator
                            ]}
                            onPress={() => scrollToIndex(index)}
                        />
                        ))}
                    </View>
                    )
                }
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
                            onPress={() => {
                                console.log("Navigating to EventPage with eventData:", event); // Log event before navigation
                                navigation.navigate({
                                    name: 'EventPage',
                                    params: { eventData: JSON.stringify(event) }, // converting the event object into a string json to pass it in
                                });                                                            }}>
                            <Image source={event.image ? { uri: event.image } : upcoming} style={styles.image}/>
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
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        padding: 16,
        gap: 10,
        fontFamily: 'IMFell'
    },
    mainTitle:{
        fontSize: 25, 
        fontFamily: 'IMFell'
    }, 
    toggleIcon: {
        position: 'absolute', 
        top: 10,
        right: 10,
        zIndex: 10,
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
        marginBottom: 20,
        fontFamily: 'IMFellItalic'
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
        fontFamily: 'IMFell'
    }, 
    eventInformation: {
        fontSize: 15, 
        marginVertical: 5,
        fontFamily: 'IMFell'
    }, 
    eventLocation: {
        fontSize: 14, 
        marginVertical: 5,
        fontFamily: 'IMFell'
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
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    indicator: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    activeIndicator: {
        width: 24,
        backgroundColor: '#4b4b4b', // The darker color from your screenshot
    },
    inactiveIndicator: {
        width: 8,
        backgroundColor: '#d3d3d3', // Light gray color for inactive dots
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
    listName: {
        fontFamily: 'IMFell', 
        fontSize: 18,
    },
    listDescription: {
        fontFamily: 'IMFell', 
        fontSize: 13,
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