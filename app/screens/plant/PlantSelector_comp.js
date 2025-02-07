import { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder,
    TouchableOpacity,
} from 'react-native';
import pichu from '@assets/pichu.jpg';
import raichu from '@assets/raichu.jpg';
import pikachu from '@assets/pikachu.jpg';
import happy from '@assets/happythumbsup.webp';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = SCREEN_WIDTH * .25;
const SWIPE_OUT_DURATION = 250;

const PLANTS = [
    {
        id: '1',
        name: "Japanese Garden",
        image: pichu,
    },
    {
        id: '2',
        name: "garden 2",
        image: pikachu,
    },
    {
      id: '3',
      name: "garden 3",
      image: raichu,
  },
  {
    id: '4',
    name: "garden 4",
    image: happy,
},
];

const PlantSelector = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const position = useRef(new Animated.ValueXY()).current;
    const rotation = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
        outputRange: ['-30deg', '0deg', '30deg'],
    });

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
    };

    const onSwipeComplete = (direction) => {
        const x = direction === 'right' ? SCREEN_WIDTH * 2 : -SCREEN_WIDTH * 2;
        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false,
        }).start(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % PLANTS.length);
            position.setValue({ x: 0, y: 0 });
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    onSwipeComplete('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    onSwipeComplete('left');
                } else {
                    resetPosition();
                }
            },
        })
    ).current;

    const getCardStyle = () => {
        const rotate = rotation;
        return {
            transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate }
            ]
        };
    };

    const renderCards = () => {
        if (currentIndex >= PLANTS.length) {
            setCurrentIndex(0);
            return null;
        }

        return PLANTS.map((plant, index) => {
            if (index < currentIndex) return null;

            if (index === currentIndex) {
                return (
                    <Animated.View
                        key={plant.id}
                        style={[
                            styles.cardStyle,
                            getCardStyle(),
                            { zIndex: 1 }
                        ]}
                        {...panResponder.panHandlers}
                    >
                        <PlantCard plant={plant} />
                    </Animated.View>
                );
            }

            return (
                <Animated.View
                    key={plant.id}
                    style={[
                        styles.cardStyle,
                        {
                            transform: [
                                { scale: 0.95 },
                                { translateY: 10 * (index - currentIndex) }
                            ],
                            zIndex: 0,
                            position: 'absolute'
                        }
                    ]}
                >
                    <PlantCard plant={plant} />
                </Animated.View>
            );
        }).reverse();
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>{renderCards()}</View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.skipButton]}
                    onPress={() => onSwipeComplete('left')}
                >
                    <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.selectButton]}
                    onPress={() => onSwipeComplete('right')}
                >
                    <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const PlantCard = ({ plant }) => (
    <View style={styles.card}>
        <Image source={plant.image} style={styles.image} />
        <View style={styles.cardContent}>
            <Text style={styles.plantName}>{plant.name}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    cardStyle: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_HEIGHT * 0.7,
        transform: [{ translateX: 0 }, { translateY: 0 }],
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: '100%',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    cardStyle: {
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.7,
      backgroundColor: 'white',
      margin: 2,
  },
    image: {
        width: '100%',
        height: '75%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cardContent: {
        padding: 20,
    },
    plantName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 20,
        paddingBottom: 40,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        minWidth: 120,
        alignItems: 'center',
    },
    skipButton: {
        backgroundColor: '#f0f0f0',
    },
    selectButton: {
        backgroundColor: '#4CAF50',
    },
    skipButtonText: {
        fontSize: 16,
        color: '#666',
    },
    selectButtonText: {
        fontSize: 16,
        color: 'white',
    },
});

export default PlantSelector;