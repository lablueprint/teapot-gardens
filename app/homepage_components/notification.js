import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Notifcation ({ data }) {
  return (
    <View style={style.notifcationContainer}>
        <Text style={styles.headerTitle}>
        {data.title}
        </Text>
        <Text style={styles.messageText}>
            {data.messageText}
        </Text>
        <Text style={styles.time}>
            {data.time}
            </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    notificationContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
      },
      messageText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
        lineHeight: 22,
      },
      time: {
        fontSize: 12,
        color: '#999',
        alignSelf: 'flex-end',
      },
    });