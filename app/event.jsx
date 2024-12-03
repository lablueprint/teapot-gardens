import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import styles from './event_style';

const Event = (props) => {
  const Popup = () => {
    console.log('popup')
  }
  
  return (
    <View style={ styles.eventContainer }>
      <Pressable onPress={Popup}>
        <Text>
          {props.title}
        </Text>
        <Text>
          {props.date}
        </Text>
      </Pressable>
    </View>
  );
};

export default Event;
