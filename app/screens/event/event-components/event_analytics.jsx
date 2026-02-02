import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity, TextInput, Alert} from 'react-native';
import { useNavigation } from 'expo-router';
import AnalyticsChart from "@screens/event/event-components/AnalyticsChart.jsx";
import { useRoute } from '@react-navigation/native';
import {useFonts} from 'expo-font';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const EventAnalytics = () => {
    const navigation = useNavigation();
    const [isExporting, setIsExporting] = useState(false);

    const route = useRoute();
    const eventData = JSON.parse(route.params?.eventData) || null;
    const stats = JSON.parse(route.params?.stats) || null;
    const attendeeNames = JSON.parse(route.params?.attendeeNames) || null;
    const attendeeCount = JSON.parse(route.params?.attendeeCount) || null;

    console.log('Event Data on Analytics:', eventData);

    const [fontsLoaded] = useFonts({
        'IMFell': require('../../../../assets/fonts/IMFellGreatPrimer-Regular.ttf'),
        'IMFellItalic': require('../../../../assets/fonts/IMFellGreatPrimer-Italic.ttf')
    });

    const handleExportCSV = async () => {
        if (!eventData?._id) {
            Alert.alert('Error', 'No event data available to export');
            return;
        }

        setIsExporting(true);
        try {
            const url = `http://localhost:4000/api/events/${eventData._id}/export`;
            const fileUri = `${FileSystem.documentDirectory}event_${eventData._id}_export.csv`;

            // Download the CSV file
            const downloadResult = await FileSystem.downloadAsync(url, fileUri);

            if (downloadResult.status === 200) {
                // Check if sharing is available
                const isAvailable = await Sharing.isAvailableAsync();
                if (isAvailable) {
                    await Sharing.shareAsync(downloadResult.uri);
                    Alert.alert('Success', 'CSV file exported successfully!');
                } else {
                    Alert.alert('Success', `File saved to: ${fileUri}`);
                }
            } else {
                Alert.alert('Error', 'Failed to download CSV file');
            }
        } catch (error) {
            console.error('Export error:', error);
            Alert.alert('Error', `Failed to export data: ${error.message}`);
        } finally {
            setIsExporting(false);
        }
    };

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate({
                                            name: 'EventPage',
                                            params: { eventData: JSON.stringify(eventData) },
                                        })}>
                <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.exportButton}
                    onPress={handleExportCSV}
                    disabled={isExporting}
                >
                    <Text style={styles.exportButtonText}>
                        {isExporting ? 'Exporting...' : '📊 Export CSV'}
                    </Text>
                </TouchableOpacity>
            </View>

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
                        <Text style={styles.chartTitle}>Ethnicty Insights</Text>
                        <AnalyticsChart list={stats.userStatsList} field={'race'}/>
                    </View>
                    <View style={styles.chart}>
                        <Text style={styles.chartTitle}>Age Insights</Text>
                        <AnalyticsChart list={stats.userStatsList} field={'age'}/>
                    </View>
                    <View style={styles.chart}> 
                        <Text style={styles.chartTitle}>Income Insights</Text>
                        <AnalyticsChart list={stats.userStatsList} field={'incomeLevel'}/>
                    </View>
                    <View style={styles.chart}>
                        <Text style={styles.chartTitle}>Attendance</Text>
                        <Text style={styles.chartDetails}>{attendeeNames.filter(attendee => attendee.attendedEvents?.includes(eventData._id)).length / attendeeCount * 100}%</Text>            
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 10,
    },
    backButton: {
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
    exportButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    exportButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
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
    chartDetails: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default EventAnalytics;