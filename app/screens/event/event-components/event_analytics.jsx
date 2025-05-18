import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity, TextInput} from 'react-native';
import { useNavigation } from 'expo-router';
import AnalyticsChart from "@screens/event/event-components/AnalyticsChart.jsx";
import { useRoute } from '@react-navigation/native';
import {useFonts} from 'expo-font';

const EventAnalytics = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const eventData = JSON.parse(route.params?.eventData) || null;
    const stats = JSON.parse(route.params?.stats) || null;

    const [fontsLoaded] = useFonts({
        'IMFell': require('../../../../assets/fonts/IMFellGreatPrimer-Regular.ttf'),
        'IMFellItalic': require('../../../../assets/fonts/IMFellGreatPrimer-Italic.ttf')
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate({
                                        name: 'EventPage',
                                        params: { eventData: JSON.stringify(eventData) }, 
                                    })}>
            <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Event Analytics</Text>
                                    
            <View style={styles.chartContainer}>
            {stats?.userStatsList?.length
                ? (
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: '90%' }}>
                    <View style={styles.chart}>
                        <Text style={styles.chartTitle}>Gender Insights</Text>
                        <AnalyticsChart list={stats.userStatsList} field={'genderIdentification'}/>
                    </View>
                    <View style={styles.chart}>
                        <Text style={styles.chartTitle}>Race Insights</Text>
                        <AnalyticsChart list={stats.userStatsList} field={'race'}/>
                    </View>
                    <View style={styles.chart}> 
                        <Text style={styles.chartTitle}>Income Insights</Text>
                        <AnalyticsChart list={stats.userStatsList} field={'incomeLevel'}/>
                    </View>
                </ScrollView>
                )
                : <Text>No attendee stats available</Text>
            }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "#E9E5DA",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    backButton: {
        marginTop: 50,
        backgroundColor: 'white', 
        display: 'flex',
        borderRadius: 50,
        width: 30, 
        height: 30,
    },
        backButtonText: {
        marginTop: 5,
        color: 'black',
        textAlign: 'center',
    },
    title: {
        fontSize: 30,
        margin: 20,
        fontFamily: 'IMFell',
        textAlign: 'left',
    },
    chartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chart: {
        display: 'flex',
        backgroundColor: 'white',
        marginBottom: 20, 
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
    }, 
    chartTitle: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default EventAnalytics;