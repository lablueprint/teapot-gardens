import { React, useState, useEffect, useRef } from 'react';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import { Text, StyleSheet, ScrollView, View, Image, Pressable, Dimensions } from 'react-native';
import axios from 'axios';
import defaultPic from '@assets/default.png';
import discover from '@assets/discover.png';
import newprogram from '@assets/newprogram.png';
import upcoming from '@assets/upcoming.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import upcomingevent from '@assets/upcomingevent-1.png';
import garden from '@assets/garden.jpg';


// IMPORTING IMAGES FOR DEMO DAY 
import CinemaSaloon from "@assets/discovery-assets/Cinema-Saloon.png"
import ArtOasis from "@assets/discovery-assets/Art-Oasis.png"
import GardenSundaze from "@assets/discovery-assets/Garden-Sundaze.png"

const url = 'http://localhost:4000'

export default function DiscoverPage () {
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;
    const cardWidth = windowWidth * 0.7;
    const cardSpacing = 20; // Consistent spacing between cards
    const effectiveCardWidth = cardWidth + (cardSpacing * 2); // Total width including margins

    const [events, setEvents] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const tempUserId = '696ad149027e7290f0c97e1e'; // Updated to existing user ID
    const [user, setUser] = useState(null);
    const [grid, setGrid] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${url}/api/events/`);
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
                const response = await axios.get(`${url}/api/programs/`);
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
                const response = await axios.get(`${url}/api/users/${tempUserId}`);
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    console.error('Failed to fetch user', response.data.error);
                }
            } catch (error) {
                console.error('Failed to fetch user', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
        fetchPrograms();
        fetchUser();
    }, []);

    const handleLike = async (eventId, index) => {
        try {
            const eventToUpdate = { ...events[index] };
            const response = await axios.patch(
                `${url}/api/events/like/${eventId}`,
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

    const toggleGrid = () => {
        setGrid(prevGrid => !prevGrid);
        // Reset active index when toggling view
        setActiveIndex(0);
        // Scroll back to beginning
        scrollViewRef.current?.scrollTo({
            x: 0,
            animated: true,
        });
    };

    const handleScroll = (event) => {
        if (!grid) return; // Only track scrolling in grid mode
        
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        // Calculate index based on effectiveCardWidth (card + margins)
        const currentIndex = Math.round(contentOffsetX / effectiveCardWidth);
        
        if (currentIndex !== activeIndex) {
            setActiveIndex(currentIndex);
        }
    };

    const scrollToIndex = (index) => {
        if (!scrollViewRef.current) return;
        
        // Scroll to the precise position using effectiveCardWidth
        scrollViewRef.current.scrollTo({
            x: index * effectiveCardWidth,
            animated: true,
        });
        setActiveIndex(index);
    };

    const [fontsLoaded] = useFonts({
        'IMFell': require('../../../assets/fonts/IMFellGreatPrimer-Regular.ttf'),
        'IMFellItalic': require('../../../assets/fonts/IMFellGreatPrimer-Italic.ttf')
    });

    if (!fontsLoaded) return null;

    // Calculate total number of items (programs + create program button)
    const totalItems = programs.length + 1;

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pageContainer}>
                <View style={styles.toggleIcon}>
                    <Pressable onPress={toggleGrid} style={styles.iconButton}>
                        <Ionicons 
                            name={grid ? "list-outline" : "tablet-portrait"}
                            size={30} 
                            color="#F9F5F5" 
                        />
                    </Pressable>
                </View>

                <Text style={styles.mainTitle}>Discover</Text>
                <Text style={styles.subHeading}>Explore Program Pages</Text>
                
                {grid && (
                    <View style={styles.indicatorContainer}>
                        {Array.from({ length: totalItems }).map((_, index) => (
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
                )}

                <ScrollView
                    ref={scrollViewRef}
                    horizontal={grid}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    snapToInterval={effectiveCardWidth}
                    contentContainerStyle={grid ? styles.gridContentContainer : {}}
                    style={styles.eventContainer}
                    pagingEnabled={grid}
                >
                    <Pressable
                        style={[
                            grid ? styles.gridProgramContainer : styles.listProgramContainer,
                            grid ? { width: cardWidth } : {}
                        ]}
                        onPress={() => {
                            console.log("Navigating to Create Program");
                            navigation.navigate('CreateProgram', {});
                        }}>
                        {grid ? (
                            <View>
                                <Image source={newprogram} style={styles.gridProgramImage} />
                            </View>
                        ) : (
                            <>
                                <View style={styles.listText}>
                                    <Text style={styles.listName}>Create Program</Text>
                                </View>
                                <Image source={newprogram} style={styles.listProgramImage} />
                            </>
                        )}
                    </Pressable>
                    {programs.map((program, index) => (
                        <Pressable
                            key={index}
                            style={[
                                grid ? styles.gridProgramContainer : styles.listProgramContainer,
                                grid ? { width: cardWidth } : {}
                            ]}
                            onPress={() => {
                                console.log("Navigating to ProgramPage", program);
                                navigation.navigate('ProgramPage', {
                                    programData: JSON.stringify(program),
                                });
                            }}>
                            {grid ? (
                                <View> 
                                    <Image source={discover} style={styles.gridProgramImage} />
                                </View>
                            ) : (
                                <>
                                    <View style={styles.listText}>
                                        <Text style={styles.listName}>{program.name}</Text>
                                        <Text style={styles.listDescription}>{program.description}</Text>
                                    </View>
                                        <Image
                                        source={
                                            program.name === 'Cinema Saloon' ? CinemaSaloon :
                                            program.name === 'Art Oasis' ? ArtOasis :
                                            program.name === 'Garden Sundaze' ? GardenSundaze :
                                            upcomingevent
                                        }
                                        style={styles.listProgramImage}
                                        />
                                </>
                            )}
                        </Pressable>
                    ))}
                </ScrollView>
                <Text style={styles.mainTitle}>Spotlight Events</Text>
                <Text style={styles.subHeading}>Explore upcoming events</Text>
                <ScrollView horizontal={true} style={styles.eventContainer}>
                    {events.map((event, index) => (
                        <Pressable
                            key={index}
                            style={styles.eventBox}
                            onPress={() => {
                                console.log("Navigating to EventPage with eventData:", event);
                                navigation.navigate('EventPage', {
                                eventData: JSON.stringify(event),
                                });
                            }}
                        >
                            <View style={styles.imageContainer}>
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
                            <Image source={event.image ? { uri: event.image } : upcoming} style={styles.image} />
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        padding: 16,
        gap: 10,
        fontFamily: 'IMFell',
        width: '100%',
        backgroundColor: '#E8E1DD',
        paddingTop: 100
    },
    mainTitle: {
        fontSize: 25,
        fontFamily: 'IMFell'
    },
    toggleIcon: {
        position: 'absolute',
        top: 100,
        right: 10,
        zIndex: 10,
    },
    iconButton: {
        backgroundColor: '#757B4580',
        borderRadius: 8,
        padding: 10,
    },
    subHeading: {
        fontSize: 15,
        marginBottom: 20,
        fontFamily: 'IMFellItalic'
    },
    eventContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    gridContentContainer: {
        paddingHorizontal: 20, // Consistent padding
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
        fontFamily: 'IMFell'
    },
    eventDescription: {
        fontSize: 15,
        fontFamily: 'IMFell'
    },
    eventLocation: {
        fontSize: 14,
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
    gridProgramContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 20,
    },
    gridProgramImage: {
        width: '100%',
        height: 500,
        borderRadius: 10,
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
        backgroundColor: '#4b4b4b',
    },
    inactiveIndicator: {
        width: 8,
        backgroundColor: '#d3d3d3',
    },
    listProgramContainer: {
        borderWidth: 2,
        borderColor: 'rgba(128, 128, 128, 0.05)', 
        borderColor: 'gray',
        borderRadius: 20,
        width: '125%',
        height: 130,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10, 
        padding: 2,
        gap: 20,
        backgroundColor:'#E8E7DF'
    },
    listProgramImage: {
        height: 125,
        width: 130,
        borderTopRightRadius: 10, 
        borderBottomRightRadius: 10,
    },
    listText: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '100%',
        width: 150,
    },
    listName: {
        fontFamily: 'IMFell',
        fontSize: 20,
    },
    listDescription: {
        fontFamily: 'IMFell',
        fontSize: 13,
        color: '#403C3C80',
        marginTop: 10
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