import React, {useState} from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, TextInput} from 'react-native';
import { useNavigation } from 'expo-router';
import AnalyticsChart from "@screens/event/event-components/AnalyticsChart.jsx";
import { useRoute } from '@react-navigation/native';

const EventAnalytics = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const eventData = route.params?.eventData || null;
    const stats = route.params?.stats || null;

    return (
        <View style={styles.overlay}>
            <Pressable onPress={() => navigation.navigate('EventPage')} >
                <Text>back</Text>
            </Pressable>

            <Text>Event Analytics</Text>
            <Text>{eventData?.eventName}</Text>
            <Text>{eventData?.eventDate}</Text>
            <Text>{eventData?.eventLocation}</Text>

            {stats?.userStatsList?.length
                ? (
                <AnalyticsChart
                    list={stats.userStatsList}
                    field={
                    activeTab === 'Gender'
                    ? 'genderIdentification'
                    : activeTab === 'Ethnicity'
                    ? 'race'
                    : 'incomeLevel'
                    }
                />
                )
                : <Text>No attendee stats available</Text>}
            <Text>hi</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default EventAnalytics;