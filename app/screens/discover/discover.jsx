import React from 'react';
import CollapsibleComp from './discover_components/collapsible';
import { Text, StyleSheet, ScrollView, View } from 'react-native';


export default function DiscoverPage () {
    const programsData = [
        {
            title: "Garden Sundaze",
            body: "Join us for a relaxing afternoon in our community garden."
        },
        {
            title: "Kimchi Workshop",
            body: "Learn how to make traditional Korean kimchi from scratch."
        },
        {
            title: "Cinema Saloon",
            body: "Weekly gathering to watch and discuss classic films."
        }
    ];

    return (
        <View>
        <Text style={ styles.mainTitle}> Discover </Text>
        <ScrollView>
            <View style={styles.pageContainer}>
                {programsData.map((program, index) => (
                    <CollapsibleComp 
                        key={index}
                        data={program}
                    />
                ))}
            </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        padding: 16,
        gap: 16, 
    },
    mainTitle:{
        fontSize: 35
    },
});