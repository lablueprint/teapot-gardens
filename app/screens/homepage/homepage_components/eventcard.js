import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function EventCard({ title, time, date, location, image }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.leftText}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{location}</Text>
        </View>
        <View style={styles.rightText}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.subtitle}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    padding: 15,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#D9D9D9',
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    // marginTop: 5,
  },
  leftText: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rightText: {
    alignItems: 'flex-end', 
    justifyContent: 'flex-start',
  },
});
