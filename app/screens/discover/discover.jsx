import { React, useState, useEffect, useRef } from 'react';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import { Text, StyleSheet, ScrollView, View, Image, Pressable, Dimensions } from 'react-native';
import axios from 'axios';
import defaultPic from '@assets/default.png';
import discover from '@assets/discover.png';
import upcoming from '@assets/upcoming.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import garden from '@assets/garden.jpg';

// const url = 'https://272a-75-142-52-157.ngrok-free.app'
const url = 'http://localhost:4000'

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
    const [loading, setLoading] = useState(true);
    const tempUserId = '678f3a6bc0368a4c717413a8';
    const url = 'http://localhost:4000';
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
            fetchEvents([]);
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
    };

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

    if (!fontsLoaded) return null;

    return (
        <ScrollView>
            <View style={styles.pageContainer}>
                <View style={styles.toggleIcon}>
                    <Pressable onPress={toggleGrid}>
                        <Ionicons 
                            name={grid ? "grid" : "tablet-portrait"}
                            size={40} 
                            color="#D2D0D0" 
                        />
                    </Pressable>
                </View>

                <Text style={styles.mainTitle}>Discover</Text>
                <Text style={styles.subHeading}>Explore Program Pages</Text>

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
                            style={[
                                grid ? styles.gridProgramContainer : styles.listProgramContainer,
                                grid ? { width: cardWidth, marginLeft: cardSpacing / 2, marginRight: cardSpacing / 2 } : {}
                            ]}
                            onPress={() => navigation.navigate('ProgramPage')}
                        >
                            {grid ? (
                                <Image source={discover} style={styles.gridProgramImage} />
                            ) : (
                                <>
                                    <Image source={discover} style={styles.listProgramImage} />
                                    <View style={styles.listText}>
                                        <Text style={styles.listName}>{program.name}</Text>
                                        <Text style={styles.listDescription}>{program.description}</Text>
                                    </View>
                                    <Pressable style={styles.followButton}>
                                        <Text style={{ color: 'darkgreen' }}>Follow</Text>
                                    </Pressable>
                                    <Ionicons name="arrow-forward-outline" size={20} color="gray" />
                                </>
                            )}
                        </Pressable>
                    ))}
                </ScrollView>

                {grid && (
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
                )}

                <View style={styles.createProgramContainer}>
                    {user?.admin && (
                        <Pressable
                            style={styles.createProgramButton}
                            onPress={() => navigation.navigate('CreateProgram')}
                        >
                            <Text style={styles.plusButton}>+</Text>
                        </Pressable>
                    )}
                </View>

                <Text style={styles.mainTitle}>Upcoming Events</Text>
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
        fontFamily: 'IMFell'
    },
    mainTitle: {
        fontSize: 25,
        fontFamily: 'IMFell'
    },
    toggleIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
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
        backgroundColor: '#4b4b4b',
    },
    inactiveIndicator: {
        width: 8,
        backgroundColor: '#d3d3d3',
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
